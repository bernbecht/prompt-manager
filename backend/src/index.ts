import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import { promptsRouter } from './routes/prompts'
import { authRouter } from './routes/auth'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
  res.json({ message: 'Hello World' })
})

// Create a new user
app.post('/users', async (req, res) => {
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
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error getting users' })
  }
})

// Get a user by ID
app.get('/users/:id', async (req, res) => {
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
app.put('/users/:id', async (req, res) => {
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
app.delete('/users/:id', async (req, res) => {
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

app.use('/prompts', promptsRouter)
app.use('/auth', authRouter)

const server = app.listen(3001, () =>
  console.log('🚀 Server ready at: http://localhost:3001')
)
