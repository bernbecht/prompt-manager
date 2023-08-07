// @ts-nocheck
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import createError from 'http-errors'

const prisma = new PrismaClient()
dotenv.config()

async function createUser(data) {
  const { email, name, password } = data

  try {
    const hashedPassword = await bcrypt.hash(password, 8)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })
    return user
  } catch (error) {
    console.error(error.message)
    console.error(error.code)
    throw createError.InternalServerError('Error creating user')
  }
}

export { createUser }
