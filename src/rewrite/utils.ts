export const POSTCSS_CONFIG = `
const config = { plugins: ['@tailwindcss/postcss'] }
export default config
`

export const PROJECT_CONFIG = `
import { NextConfig } from 'next'

export default {
  reactStrictMode: false,
  devIndicators: false
} satisfies NextConfig
`

export const PROJECT_ESLINT_CONFIG = `
import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({baseDirectory: __dirname})
const eslintConfig = [...compat.extends('next/core-web-vitals', 'next/typescript')]

export default eslintConfig
`

export const PROJECT_GIT_IGNORE = `.vercel
.next
tsconfig.tsbuildinfo
node_modules
.env
next-env.d.ts
`
