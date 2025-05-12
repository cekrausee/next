import { write } from 'bun'
import { mkdir } from 'node:fs/promises'
import { APP_ERROR_PAGE, APP_LOADING_PAGE, APP_NOT_FOUND_PAGE, APP_PAGE, APP_SIGN_ERROR, APP_SIGN_PAGE, APP_SIGN_SEARCH } from './utils'

const writeAppPage = async () => {
  await write('src/app/page.tsx', APP_PAGE)
}

const writeAppLoadingPage = async () => {
  await write('src/app/loading.tsx', APP_LOADING_PAGE)
}

const writeAppNotFoundPage = async () => {
  await write('src/app/not-found.tsx', APP_NOT_FOUND_PAGE)
}

const writeAppErrorPage = async () => {
  await write('src/app/error.tsx', APP_ERROR_PAGE)
}

const mkAppSignDir = async () => {
  await mkdir('src/app/sign')
}

const writeAppSignPage = async () => {
  await write('src/app/sign/page.tsx', APP_SIGN_PAGE)
}

const writeAppSignErrorPage = async () => {
  await write('src/app/sign/error.tsx', APP_SIGN_ERROR)
}

const writeAppSignSearch = async () => {
  await write('src/app/sign/search.tsx', APP_SIGN_SEARCH)
}

const initAppSignPage = async () => {
  await mkAppSignDir()
  await Promise.all([writeAppSignPage(), writeAppSignErrorPage(), writeAppSignSearch()])
}

export const initAppPages = async () => {
  await Promise.all([writeAppPage(), writeAppLoadingPage(), writeAppNotFoundPage(), writeAppErrorPage(), initAppSignPage()])
}
