import { write } from 'bun'
import { POSTCSS_CONFIG, PROJECT_CONFIG, PROJECT_ESLINT_CONFIG, PROJECT_GIT_IGNORE } from './utils'

const rewritePostCssConfig = async () => {
  await write('postcss.config.mjs', POSTCSS_CONFIG)
}

const rewriteProjectConfig = async () => {
  await write('next.config.ts', PROJECT_CONFIG)
}

const rewriteEslintConfig = async () => {
  await write('eslint.config.mjs', PROJECT_ESLINT_CONFIG)
}

const rewriteProjectGitIgnore = async () => {
  await write('.gitignore', PROJECT_GIT_IGNORE)
}

export const rewriteProjectFiles = async () => {
  await Promise.allSettled([rewritePostCssConfig(), rewriteProjectConfig(), rewriteEslintConfig(), rewriteProjectGitIgnore()])
}
