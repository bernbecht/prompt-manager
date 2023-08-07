const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
import express from 'express'

const router = express.Router()

// Create a new user
router.post('/', async (req, res) => {
  const { email, name } = req.body
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' })
  }
})

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error getting users' })
  }
})

// Get a user by ID
router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id)
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      res.status(404).json({ error: 'User not found' })
    } else {
      res.json(user)
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting user' })
  }
})

// Update a user by ID
router.put('/:id', async (req, res) => {
  const userId = parseInt(req.params.id)
  const { email, name } = req.body
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        name,
      },
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' })
  }
})

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  const userId = parseInt(req.params.id)
  try {
    const user = await prisma.user.delete({
      where: { id: userId },
    })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' })
  }
})

export { router as usersRouter }
