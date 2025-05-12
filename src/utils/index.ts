import { write } from 'bun'
import { mkdir } from 'node:fs/promises'
import { PROJECT_DATE_SCHEMAS } from './utils'

const mkProjectUtils = async () => {
  await mkdir('src/utils')
}

const mkProjectTypes = async () => {
  await mkdir('src/utils/types')
}

const writeProjectSchemas = async () => {
  await mkdir('src/utils/schemas')
  await write('src/utils/schemas/date.ts', PROJECT_DATE_SCHEMAS)
}

const mkProjectHelpers = async () => {
  await mkdir('src/utils/helpers')
}

export const initProjectUtils = async () => {
  await mkProjectUtils()
  await Promise.all([mkProjectTypes(), writeProjectSchemas(), mkProjectHelpers()])
}
