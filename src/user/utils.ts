export const USER_SCHEMAS = `
import { z } from 'zod'
import { dateSchema } from './date'

export const rawUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: dateSchema
})
`

export const USER_TYPES = `
import { userModel } from '@/lib/db/schema'
import { z } from 'zod'
import { rawUserSchema } from '../schemas/user'

export type RawUser = z.infer<typeof rawUserSchema>
export type InsertUser = typeof userModel.$inferInsert
`

export const USER_ACTIONS = `
'use server'

import { drizzle } from '@/lib/db'
import { userModel } from '@/lib/db/schema'
import { InsertUser, RawUser } from '@/utils/types/user'
import { eq } from 'drizzle-orm'

export const insertUserAction = async (data: InsertUser): Promise<RawUser> => {
  const [user] = await drizzle.insert(userModel).values(data).returning()
  return user
}

export const findRawUserByEmailAction = async (email: string): Promise<RawUser | null> => {
  const user = await drizzle.query.userModel.findFirst({ where: eq(userModel.email, email) })
  return user ?? null
}

export const findRawUserAction = async (id: string): Promise<RawUser | null> => {
  const user = await drizzle.query.userModel.findFirst({ where: eq(userModel.id, id) })
  return user ?? null
}
`
