import { rm } from 'node:fs/promises'
import { spawn } from '../helpers'

const rmGitRepo = async () => {
  await rm('.git', { recursive: true, force: true })
}

const initGitRepo = async () => {
  const process = spawn(['git', 'init'])
  await process.exited
}

export const initProjectRepo = async () => {
  await rmGitRepo()
  await initGitRepo()
}
