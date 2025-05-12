import { spawnSync } from 'bun'
import { spawn } from '../../helpers'
import { CONTAINER_PORT } from './utils'

const prepareDbContainer = (containerName: string) => {
  const existing = spawnSync(['docker', 'ps', '-a', '--filter', `name=^${containerName}$`, '--format', '{{.Names}}'])
    .stdout.toString()
    .trim()

  if (existing) spawnSync(['docker', 'rm', '-f', existing])

  const lines = spawnSync(['docker', 'ps', '--format', '{{.ID}}\t{{.Names}}\t{{.Ports}}']).stdout.toString().trim().split('\n').filter(Boolean)

  lines.forEach((line) => {
    if (!line.includes(`0.0.0.0:${CONTAINER_PORT}->`)) return

    const [id] = line.split('\t')

    if (!id) return

    spawnSync(['docker', 'stop', id])
  })
}

const composeDbContainer = async (containerName: string) => {
  const process = spawn([
    'docker',
    'run',
    '--name',
    containerName,
    '-e',
    'POSTGRES_USER=root',
    '-e',
    'POSTGRES_PASSWORD=dev',
    '-p',
    `${CONTAINER_PORT}:${CONTAINER_PORT}`,
    '-d',
    'postgres:latest'
  ])

  await process.exited
}

const stopDbContainer = async () => {
  const process = spawn(['npm', 'run', 'db:stop'])
  await process.exited
}

export const initDbContainer = async (containerName: string) => {
  prepareDbContainer(containerName)
  await composeDbContainer(containerName)
  stopDbContainer()
}
