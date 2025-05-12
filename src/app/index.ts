import { write } from 'bun'
import { initAppComponents } from './components'
import { initAppPages } from './pages'
import { initAppStyle } from './style'
import { generateAppLayout } from './utils'

const writeAppLayout = async (projectName: string) => {
  await write('src/app/layout.tsx', generateAppLayout(projectName))
}

export const initProjectApp = async (projectName: string) => {
  await Promise.all([writeAppLayout(projectName), initAppPages(), initAppComponents(), initAppStyle()])
}
