import { write } from 'bun'
import { mkdir } from 'node:fs/promises'
import { APP_BASE_LINK_COMPONENT, APP_BUTTON_COMPONENT, APP_FALLBACK_COMPONENT, APP_LINK_COMPONENT } from './utils'

const mkComponentsDir = async () => {
  await mkdir('src/components')
}

const mkLinkComponentDir = async () => {
  await mkdir('src/components/link')
}

const writeLinkComponent = async () => {
  await write('src/components/link/index.tsx', APP_LINK_COMPONENT)
}

const writeBaseLinkComponent = async () => {
  await write('src/components/link/base.tsx', APP_BASE_LINK_COMPONENT)
}

const initLinkComponent = async () => {
  await mkLinkComponentDir()
  await Promise.all([writeLinkComponent(), writeBaseLinkComponent()])
}

const writeButtonComponent = async () => {
  await write('src/components/button.tsx', APP_BUTTON_COMPONENT)
}

const writeFallbackComponent = async () => {
  await write('src/components/fallback.tsx', APP_FALLBACK_COMPONENT)
}

export const initAppComponents = async () => {
  await mkComponentsDir()
  await Promise.all([initLinkComponent(), writeButtonComponent(), writeFallbackComponent()])
}
