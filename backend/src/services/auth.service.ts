const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
import bcrypt from 'bcryptjs'
import { signAccessToken, verifyAccessToken } from '../../utils/jwt'
import dotenv from 'dotenv'
import createError from 'http-errors'

dotenv.config()

async function register(data) {
  const { email, name, password } = data
  const hashedPassword = await bcrypt.hash(password, 8)
  const user = prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })
  data.accessToken = await signAccessToken(user)
  return data
}

async function login(data) {
  const { email, password } = data
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw createError.NotFound('User not registered')
  }

  const checkPassword = bcrypt.compareSync(password, user.password)
  if (!checkPassword) {
    throw createError.Unauthorized('Email or password not valid')
  }
  delete user.password
  const accessToken = await signAccessToken(user)
  return { ...user, accessToken }
}

export default {
  register,
  login,
}
