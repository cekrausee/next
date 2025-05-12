import { write } from 'bun'
import { USER_ACTIONS, USER_SCHEMAS, USER_TYPES } from './utils'

const writeUserSchemas = async () => {
  await write('src/utils/schemas/user.ts', USER_SCHEMAS)
}

const writeUserTypes = async () => {
  await write('src/utils/types/user.ts', USER_TYPES)
}

const writeUserActions = async () => {
  await write('src/actions/user.ts', USER_ACTIONS)
}

export const initProjectUser = async () => {
  await Promise.allSettled([writeUserSchemas(), writeUserTypes(), writeUserActions()])
}
