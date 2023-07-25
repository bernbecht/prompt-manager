const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
import express from 'express'

const router = express.Router()

// Get all prompts
router.get('/', async (req, res) => {
  try {
    const prompts = await prisma.prompt.findMany()
    res.json(prompts)
  } catch (error) {
    res.status(500).json({ error: 'Error getting prompts' })
  }
})

// Create a new prompt
router.post('/', async (req, res) => {
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

router.get('/search', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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

export { router as promptsRouter }
