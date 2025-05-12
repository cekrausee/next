export const APP_LINK_COMPONENT = `
import { cn } from '@/utils/helpers/cn'
import NextLink from 'next/link'
import { ComponentProps } from 'react'

export const Link = ({ unstyled, className, ...props }: { unstyled?: boolean } & ComponentProps<typeof NextLink>) => (
  <NextLink
    className={cn(!unstyled && 'button', className)}
    {...props}
  />
)
`

export const APP_BASE_LINK_COMPONENT = `
import { Link } from '.'

export const BaseLink = () => (
  <Link
    href='/'
    className='!text-base'
  >
    Head back.
  </Link>
)
`

export const APP_BUTTON_COMPONENT = `
import { cn } from '@/utils/helpers/cn'
import { ButtonHTMLAttributes } from 'react'

export const Button = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn('button', className)}
    {...props}
  />
)
`

export const APP_FALLBACK_COMPONENT = "export const Fallback = () => <div className='flex h-svh items-center justify-center text-sm'>Loading...</div>"
