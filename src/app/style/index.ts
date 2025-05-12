import { write } from 'bun'
import { rm } from 'node:fs/promises'
import { APP_STYLE_CONFIG, APP_STYLE_CSS, APP_STYLE_HELPERS } from './utils'

const writeStyleConfig = async () => {
  await write('components.json', APP_STYLE_CONFIG)
}

const writeStyleUtils = async () => {
  await write('src/utils/helpers/cn.ts', APP_STYLE_HELPERS)
}

const writeStyleCss = async () => {
  await Promise.all([rm('src/app/globals.css'), await write('src/app/index.css', APP_STYLE_CSS)])
}

export const initAppStyle = async () => {
  await Promise.allSettled([writeStyleConfig(), writeStyleUtils(), writeStyleCss()])
}
