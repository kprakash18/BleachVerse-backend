import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

// 1. Create a native pg Pool instance first
const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL 
})

// 2. Pass that pool instance into the PrismaPg adapter
const adapter = new PrismaPg(pool)

// 3. Initialize PrismaClient with the adapter
const prisma = new PrismaClient({ adapter })

export default prisma