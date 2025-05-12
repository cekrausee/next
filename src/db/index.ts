import { write } from 'bun'
import { initDbContainer } from './container'
import { DRIZZLE_CLIENT, DRIZZLE_CONFIG, DRIZZLE_SCHEMA } from './utils'

const writeDbConfig = async () => {
  await write('drizzle.config.ts', DRIZZLE_CONFIG)
}

const writeDbClient = async () => {
  await write('src/lib/db/index.ts', DRIZZLE_CLIENT)
}

const writeDbSchema = async () => {
  await write('src/lib/db/schema.ts', DRIZZLE_SCHEMA)
}

const prepareDb = async () => {
  await Promise.all([writeDbConfig(), writeDbClient(), writeDbSchema()])
}

export const initProjectDb = async (containerName: string) => {
  await prepareDb()
  await initDbContainer(containerName)
}
