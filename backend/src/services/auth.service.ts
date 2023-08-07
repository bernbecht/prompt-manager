// @ts-nocheck
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { signAccessToken } from '../../utils/jwt'
import dotenv from 'dotenv'
import createError from 'http-errors'
import { createUser } from './user.service'

const prisma = new PrismaClient()
dotenv.config()

async function register(data) {
  const { email, name, password } = data

  if (!email || !name || !password) {
    throw createError.Unauthorized('Email or password not valid')
  }

  const user = await createUser(data)

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
