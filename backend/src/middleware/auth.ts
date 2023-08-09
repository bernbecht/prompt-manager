import express from 'express'
import { verifyAccessToken } from '../../utils/jwt'
import createError from 'http-errors'
import { AuthenticatedReq } from '../../types'

async function auth(
  req: AuthenticatedReq,
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
    const user: any = await verifyAccessToken(token)
    req.user = user?.payload
    next()
  } catch (error) {
    next(createError.Unauthorized(error.message))
  }
}

export { auth }
