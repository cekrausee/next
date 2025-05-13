#!/usr/bin/env bun

import { readdir } from 'node:fs/promises'
import { createInterface } from 'node:readline/promises'
import { initProject } from '.'

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
})

const askProjectName = async () => {
  const name = await readline.question('What is the name of your project? ')

  if (!name) {
    console.warn('Invalid project name.\n')
    return askProjectName()
  }

  console.log()

  return name.trim().replace(/\s+/g, '-')
}

const getProjectName = async () => {
  let name = process.argv[2]
  if (!name) name = await askProjectName()

  return name
}

const processProjectName = async (name: string) => {
  const dir = await readdir('.')

  if (dir.includes(name)) {
    console.warn(`Conflict: a register with the name "${name}" already exists.`)
    process.exit(1)
  }

  return name
}

const finishSetup = async (projectName: string) => {
  console.log(`
Project setup complete.

To start the development server, run:

1. cd ${projectName}
2. npm run db:start
3. npm run db:push
2. npm run dev`)

  process.exit(0)
}

const main = async () => {
  let projectName = await getProjectName()
  projectName = await processProjectName(projectName)

  await initProject(projectName)

  finishSetup(projectName)
}

if (import.meta.main) main()
