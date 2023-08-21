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

/**
 * 1) Checks if user exists
 * 2) Checks if password is correct
 * 3) Generates access token
 * 4) Returns user data and access token
 */
async function login(data) {
  const { email, password } = data
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw createError.Unauthorized('Email or password not valid')
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
