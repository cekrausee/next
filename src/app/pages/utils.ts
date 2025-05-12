export const APP_PAGE = `
const Page = () => <></>
export default Page
`

export const APP_LOADING_PAGE = `
import { Fallback } from '@/components/fallback'

const Loading = () => <Fallback />
export default Loading
`

export const APP_NOT_FOUND_PAGE = `
import { BaseLink } from '@/components/link/base'

const NotFound = () => (
  <div className='flex h-svh items-center justify-center'>
    <div className='w-64 space-y-1.5'>
      <p>Page not found.</p>
      <BaseLink />
    </div>
  </div>
)

export default NotFound
`

export const APP_ERROR_PAGE = `
'use client'

import { BaseLink } from '@/components/link/base'

const Error = () => (
  <div className='flex h-svh items-center justify-center'>
    <div className='w-64 space-y-1.5'>
      <p>An unknown error has occurred.</p>
      <BaseLink />
    </div>
  </div>
)

export default Error
`

export const APP_SIGN_PAGE = `
import { oauthAction } from '@/actions/auth'
import { Button } from '@/components/button'
import { SignSearch } from './search'

const SignPage = () => (
  <div className='flex h-svh flex-1 flex-col items-center justify-center'>
    <form action={oauthAction}>
      <Button>Sign in with Google</Button>
    </form>
    <SignSearch />
  </div>
)

export default SignPage
`

export const APP_SIGN_ERROR = `
'use client'

import { BaseLink } from '@/components/link/base'

const SignError = () => (
  <div className='flex h-svh items-center justify-center'>
    <div className='w-64 space-y-1.5'>
      <p>Error while signing in.</p>
      <BaseLink />
    </div>
  </div>
)

export default SignError
`

export const APP_SIGN_SEARCH = `
'use client'

import { useSearchParams } from 'next/navigation'

export const SignSearch = () => {
  const search = useSearchParams()
  
  if (search.get('error')) throw new Error('Failed to sign in')
  return <></>
}
`
