import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'

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

// Create a new prompt
app.post('/prompts', async (req, res) => {
  const { title, content, authorId } = req.body
  try {
    const prompt = await prisma.prompt.create({
      data: {
        title,
        content,
        authorId,
      },
    })
    res.json(prompt)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error creating prompt' })
  }
})

// Get all prompts
app.get('/prompts', async (req, res) => {
  try {
    const prompts = await prisma.prompt.findMany()
    res.json(prompts)
  } catch (error) {
    res.status(500).json({ error: 'Error getting prompts' })
  }
})

app.get('/searchPrompt', async (req, res) => {
  const { title }: { title?: string } = req.query
  const filteredPosts = await prisma.prompt.findMany({
    where: {
      title: {
        contains: title,
      },
    },
  })
  res.json(filteredPosts)
})

// Get a prompt by ID
app.get('/prompts/:id', async (req, res) => {
  const promptId = parseInt(req.params.id)
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id: promptId },
    })
    if (!prompt) {
      res.status(404).json({ error: 'Prompt not found' })
    } else {
      res.json(prompt)
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting prompt' })
  }
})

// Update a prompt by ID
app.put('/prompts/:id', async (req, res) => {
  const promptId = parseInt(req.params.id)
  const { title, content, authorId } = req.body
  try {
    const prompt = await prisma.prompt.update({
      where: { id: promptId },
      data: {
        title,
        content,
        authorId,
      },
    })
    res.json(prompt)
  } catch (error) {
    res.status(500).json({ error: 'Error updating prompt' })
  }
})

// Delete a prompt by ID
app.delete('/prompts/:id', async (req, res) => {
  const promptId = parseInt(req.params.id)
  try {
    const prompt = await prisma.prompt.delete({
      where: { id: promptId },
    })
    res.json(prompt)
  } catch (error) {
    res.status(500).json({ error: 'Error deleting prompt' })
  }
})

const server = app.listen(3001, () =>
  console.log('🚀 Server ready at: http://localhost:3001')
)
