export const API_ACTIONS = `
'use server'

import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { findRawUserAction } from './user'

type Request = { body?: unknown; external?: boolean; authorize?: boolean } & Omit<RequestInit, 'body'>

export const request = async () => {
  const request = async (url: string, init?: Request) => {
    if (!init?.external) url = new URL(\`/api/\${url}\`, process.env.BASE_URL).toString()

    const headers = new Headers(init?.headers)

    if (init?.authorize) {
      const store = await cookies()
      const token = store.get(process.env.AUTH_SALT!)

      if (token) headers.append('authorization', token.value)
    }

    const res = await fetch(url, { ...init, body: JSON.stringify(init?.body), headers })
    const data = await res.json()

    return data
  }

  return {
    get: async (url: string, init?: Omit<Request, 'method'>) => request(url, { ...init, method: 'GET' }),
    post: async (url: string, init?: Omit<Request, 'method'>) => request(url, { ...init, method: 'POST' }),
    put: async (url: string, init?: Omit<Request, 'method'>) => request(url, { ...init, method: 'PUT' })
  }
}

export const unmountRequest = async (req: NextRequest) => {
  const token = req.headers.get('authorization')

  if (!token) return {}

  const decoded = await decode({ token, salt: process.env.AUTH_SALT!, secret: process.env.AUTH_SECRET! })
  const parse = z.object({ userId: z.string() }).safeParse(decoded)

  if (!parse.success) return {}

  try {
    const user = await findRawUserAction(parse.data.userId)
    return user ? { user } : {}
  } catch {
    return {}
  }
}
`

export const API_HELPERS = `
import { env } from 'process'
import { InspectOptions } from 'util'

export const unauthorizedError = () => Response.json({ message: 'Unauthorized' }, { status: 401 })
export const payloadParseError = () => Response.json({ message: 'Failed to parse payload' }, { status: 422 })

export const logger = (message: string, data?: unknown, opts: InspectOptions = { depth: 5 }) => {
  if (env.NODE_ENV !== 'development') return

  const log: { message: string; data?: unknown } = { message }

  if (data) log.data = data

  console.dir(log, opts)
}
`
