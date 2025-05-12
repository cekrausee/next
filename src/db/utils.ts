export const DRIZZLE_CONFIG = `
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: 'src/lib/db/schema.ts',
  dbCredentials: { url: process.env.POSTGRES_URL! }
})
`

export const DRIZZLE_CLIENT = `
import { sql } from '@vercel/postgres'
import 'dotenv/config'
import { NodePgClient, NodePgDatabase, drizzle as pgDrizzle } from 'drizzle-orm/node-postgres'
import { drizzle as vercelDrizzle, VercelPgDatabase } from 'drizzle-orm/vercel-postgres'
import { env } from 'process'
import * as schema from './schema'

type Schema = typeof schema

export type DrizzleClient = (NodePgDatabase<Schema> & { $client: NodePgClient }) | VercelPgDatabase<Schema>

let client: DrizzleClient | null = null

if (env.NODE_ENV === 'development') client = pgDrizzle(env.POSTGRES_URL!, { schema })
else client = vercelDrizzle({ client: sql, schema })

export const drizzle = client
`

export const DRIZZLE_SCHEMA = `
import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const userModel = pgTable('Users', {
  id: text().primaryKey().$defaultFn(createId),
  email: text().notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  image: text(),
  createdAt: timestamp('created_at').notNull().defaultNow()
})
`
