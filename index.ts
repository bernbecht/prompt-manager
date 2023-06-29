import cors from 'cors'
import express from 'express'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
  res.json({ message: 'Hello World' })
})

const server = app.listen(3001, () =>
  console.log('🚀 Server ready at: http://localhost:3001')
)
