export const generateAppLayout = (projectName: string) => `
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './index.css'

export const metadata: Metadata = { title: '${projectName}' }

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <body className={(sans.variable, mono.variable)}>{children}</body>
  </html>
)

export default Layout
`
