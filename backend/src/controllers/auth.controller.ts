import authService from '../services/auth.service'
import createError from 'http-errors'

async function register(req, res, next) {
  try {
    const user = await authService.register(req.body)
    res.status(200).json({
      status: true,
      message: 'User created successfully',
      data: user,
    })
  } catch (error) {
    next(createError(error.statusCode, error.message))
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
