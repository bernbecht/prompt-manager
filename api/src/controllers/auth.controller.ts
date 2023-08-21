import express from 'express'
import authService from '../services/auth.service'
import createError from 'http-errors'

async function register(req: express.Request, res: express.Response) {
  try {
    const user = await authService.register(req.body)
    res.status(200).json({
      status: true,
      message: 'User created successfully',
      data: user,
    })
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message })
  }
}

async function login(req, res, next) {
  try {
    const data = await authService.login(req.body)
    res.status(200).json({
      status: true,
      message: 'Login successful',
      data,
    })
  } catch (error) {
    next(createError(error.statusCode, error.message))
  }
}

export default {
  register,
  login,
}
