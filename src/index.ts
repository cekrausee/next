import { file, write } from 'bun'
import { mkdir, rm } from 'node:fs/promises'
import { initProjectApi } from './api'
import { initProjectApp } from './app'
import { initProjectAuth } from './auth'
import { PRETTIER_CONFIG } from './constants'
import { initProjectDb } from './db'
import { generateProjectReadme, generateProjectSecrets, spawn } from './helpers'
import { initProjectRepo } from './repo'
import { rewriteProjectFiles } from './rewrite'
import { initProjectUser } from './user'
import { initProjectUtils } from './utils'

const createProject = async (projectName: string) => {
  console.log('- Creating Next.js project...')

  const process = spawn(['npx', 'create-next-app', projectName, '--yes'])
  await process.exited
}

const cd = (directory: string) => {
  console.log('- Setting up project...')
  process.chdir(directory)
}

const installProjectDependencies = async () => {
  const processes = [
    spawn(['npm', 'install', 'drizzle-orm', 'pg', '@vercel/postgres', '@paralleldrive/cuid2', 'dotenv', 'next-auth@beta', 'zod']),
    spawn(['npm', 'install', '-D', 'drizzle-kit', 'tailwind-merge', 'clsx', 'tw-animate-css', '@types/pg', 'prettier-plugin-tailwindcss'])
  ]

  for (const process of processes) await process.exited
}

const mkProjectLib = async () => {
  await mkdir('src/lib')
}

const mkProjectServices = async () => {
  await mkdir('src/services')
}

const mkProjectActions = async () => {
  await mkdir('src/actions')
}

const mkProjectAPI = async () => {
  await mkdir('src/app/api')
}

const rmProjectPublicDir = async () => {
  await rm('public', { recursive: true, force: true })
}

const initProjectStructure = async () => {
  await Promise.allSettled([mkProjectLib(), mkProjectServices, mkProjectActions(), initProjectUtils(), mkProjectAPI(), rmProjectPublicDir()])
}

const rewriteProjectPackage = async (container: string) => {
  const pack = await file('package.json').json()

  delete pack.version
  delete pack.private

  const scripts = pack.scripts

  return write(
    'package.json',
    JSON.stringify({
      ...pack,
      scripts: {
        ...scripts,
        dev: 'npm run db:start && next dev',
        'db:start': `docker start ${container}`,
        'db:stop': `docker stop ${container}`,
        'db:push': 'drizzle-kit push',
        'check-types': 'tsc --noEmit',
        format: 'prettier --write .'
      }
    })
  )
}

const writeProjectSecrets = async () => {
  const hasher = new Bun.CryptoHasher('sha256')
  const hash = hasher.digest('base64')

  await Promise.all([write('.env', generateProjectSecrets(hash)), write('.env.example', generateProjectSecrets())])
}

const writeProjectPrettierConfig = async () => {
  await write('.prettierrc.json', PRETTIER_CONFIG)
}

const writeProjectReadme = async (projectName: string) => {
  await write('README.md', generateProjectReadme(projectName))
}

const prepareProject = async (projectName: string, containerName: string) => {
  await Promise.all([installProjectDependencies(), initProjectStructure()])

  await Promise.all([
    rewriteProjectPackage(containerName),
    writeProjectSecrets(),
    writeProjectPrettierConfig(),
    writeProjectReadme(projectName),
    initProjectApp(projectName),
    rewriteProjectFiles()
  ])
}

const initProjectDependencies = async (containerName: string) => {
  await Promise.all([initProjectDb(containerName), initProjectAuth(), initProjectApi(), initProjectUser()])
}

const formatProject = async () => {
  const process = spawn(['npm', 'run', 'format'])
  await process.exited
}

export const initProject = async (projectName: string) => {
  const containerName = `${projectName}-db`

  await createProject(projectName)

  cd(projectName)

  await prepareProject(projectName, containerName)
  await initProjectDependencies(containerName)
  await formatProject()
  await initProjectRepo()
}
