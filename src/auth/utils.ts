export const AUTH_CONFIG = `
import { processCallbackPayloadService } from '@/services/auth'
import NextAuth from 'next-auth'
import google from 'next-auth/providers/google'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    google({
      profile: async (profile) => {
        const { userId } = await processCallbackPayloadService(profile)
        return { ...profile, id: userId }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, account, trigger }) => {
      if (trigger === 'signIn') token.userId = account?.providerAccountId
      return token
    },
    session: async ({ session, token }) => {
      if (token.userId) session.user.id = token.id as string
      return session
    }
  },
  pages: { signIn: '/sign' }
})
`

export const AUTH_MIDDLEWARE = `
import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

export const { auth: middleware } = NextAuth({
  providers: [],
  callbacks: {
    authorized: ({ request, auth }) => {
      const { pathname, origin } = request.nextUrl
      const redirect = (pathname: string) => NextResponse.redirect(new URL(pathname, origin))

      if (!auth && pathname !== '/sign') return redirect('/sign')
      if (auth && pathname === '/sign') return redirect('/')

      return true
    }
  }
})

export const config = { matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)' }
`

export const AUTH_SERVICE = `
'use server'

import { sessionSchema } from '@/utils/schemas/auth'
import { Session } from '@/utils/types/auth'
import { z } from 'zod'
import { request } from '../actions/api'

const processCallbackPayloadServiceResponseSchema = z.object({ userId: z.string() })

export const processCallbackPayloadService = async (payload: unknown): Promise<z.infer<typeof processCallbackPayloadServiceResponseSchema>> => {
  const client = await request()
  const res = await client.post('auth/cb', { body: payload })

  return processCallbackPayloadServiceResponseSchema.parse(res)
}

export const getSessionService = async (): Promise<Session | null> => {
  const client = await request()

  try {
    const res = await client.get('auth/session', { authorize: true })
    const { session } = z.object({ session: sessionSchema }).parse(res)

    return session
  } catch {
    return null
  }
}

`

export const AUTH_ACTION = `
'use server'

import { signIn, signOut } from '@/lib/auth'

export const oauthAction = async () => await signIn('google')
export const signOutAction = signOut
`

export const AUTH_ROUTE = `
import { handlers } from '@/lib/auth'

const { GET, POST } = handlers
export { GET, POST }
`

export const AUTH_CALLBACK_ROUTE = `
import { findRawUserByEmailAction, insertUserAction } from '@/actions/user'
import { logger, payloadParseError } from '@/utils/helpers/api'
import { z } from 'zod'

export const POST = async (req: Request) => {
  try {
    const payload = await req.json()

    const parse = z
      .object({
        email: z.string(),
        picture: z.string(),
        given_name: z.string(),
        family_name: z.string()
      })
      .safeParse(payload)

    if (!parse.success) return payloadParseError()

    const user = await findRawUserByEmailAction(parse.data.email)
    if (user) return Response.json({ userId: user.id })

    const { email, picture, given_name, family_name } = parse.data

    const { id } = await insertUserAction({
      email,
      firstName: given_name,
      lastName: family_name,
      image: picture
    })

    return Response.json({ userId: id })
  } catch (error) {
    const message = 'Failed to process callback payload'
    logger(message, { error })

    return Response.json({ message }, { status: 500 })
  }
}
`

export const AUTH_SESSION_ROUTE = `
import { unmountRequest } from '@/actions/api'
import { unauthorizedError } from '@/utils/helpers/api'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest) => {
  const { user } = await unmountRequest(req)

  if (!user) return unauthorizedError()
  return Response.json({ session: { user } })
}
`

export const AUTH_SCHEMAS = `
import { z } from 'zod'
import { rawUserSchema } from './user'

export const sessionSchema = z.object({ user: rawUserSchema })
`

export const AUTH_TYPES = `
import { z } from 'zod'
import { sessionSchema } from '../schemas/auth'

export type Session = z.infer<typeof sessionSchema>
`
