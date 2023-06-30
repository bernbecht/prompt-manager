import { PrismaClient } from '@prisma/client'
import { users } from './seedData/users'
import { prompts } from './seedData/prompts'
const prisma = new PrismaClient()

const load = async () => {
  try {
    // erase db
    await prisma.prompt.deleteMany()
    await prisma.user.deleteMany()
    console.log('🔥 Erased db')

    users.forEach(async (user) => {
      await prisma.user.create({
        data: user,
      })
    })
    console.log('💾 Added user data')

    prompts.forEach(async (prompt) => {
      await prisma.prompt.create({
        data: prompt,
      })
    })
    console.log('💾 Added prompt data')
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
