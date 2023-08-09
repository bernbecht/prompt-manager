import express from 'express'
import { verifyAccessToken } from '../../utils/jwt'
import createError from 'http-errors'

async function auth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized('Access token is required'))
  }
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return next(createError.Unauthorized())
  }
  try {
    const user = await verifyAccessToken(token)
    //@ts-ignore
    req.user = user
    next()
  } catch (error) {
    next(createError.Unauthorized(error.message))
  }
}

export { auth }
