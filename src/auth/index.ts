import { write } from 'bun'
import { AUTH_ACTION, AUTH_CALLBACK_ROUTE, AUTH_CONFIG, AUTH_MIDDLEWARE, AUTH_ROUTE, AUTH_SCHEMAS, AUTH_SERVICE, AUTH_SESSION_ROUTE, AUTH_TYPES } from './utils'

const writeAuthConfig = async () => {
  await write('src/lib/auth.ts', AUTH_CONFIG)
}

const writeAuthMiddleware = async () => {
  await write('src/middleware.ts', AUTH_MIDDLEWARE)
}

const writeAuthService = async () => {
  await write('src/services/auth.ts', AUTH_SERVICE)
}

const writeAuthActions = async () => {
  await write('src/actions/auth.ts', AUTH_ACTION)
}

const writeAuthSchemas = async () => {
  await write('src/utils/schemas/auth.ts', AUTH_SCHEMAS)
}

const writeAuthTypes = async () => {
  await write('src/utils/types/auth.ts', AUTH_TYPES)
}

const writeAuthRoute = async () => {
  await write('src/app/api/auth/[...nextauth]/route.ts', AUTH_ROUTE)
}

const writeAuthCallbackRoute = async () => {
  await write('src/app/api/auth/cb/route.ts', AUTH_CALLBACK_ROUTE)
}

const writeAuthSessionRoute = async () => {
  await write('src/app/api/auth/session/route.ts', AUTH_SESSION_ROUTE)
}

export const initProjectAuth = async () => {
  await Promise.allSettled([
    writeAuthConfig(),
    writeAuthMiddleware(),
    writeAuthService(),
    writeAuthActions(),
    writeAuthSchemas(),
    writeAuthTypes(),
    writeAuthRoute(),
    writeAuthCallbackRoute(),
    writeAuthSessionRoute()
  ])
}
