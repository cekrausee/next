import { write } from 'bun'
import { API_ACTIONS, API_HELPERS } from './utils'

const writeApiActions = async () => {
  await write('src/actions/api.ts', API_ACTIONS)
}

const writeApiHelpers = async () => {
  await write('src/utils/helpers/api.ts', API_HELPERS)
}

export const initProjectApi = async () => {
  await Promise.all([writeApiActions(), writeApiHelpers()])
}
