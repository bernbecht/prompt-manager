import cors from 'cors'
import express from 'express'
import { promptsRouter } from './routes/prompts'
import { authRouter } from './routes/auth'
import { usersRouter } from './routes/users'
import { auth } from './middleware/auth'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
  res.json({ message: 'Hello World' })
})

app.use('/users', usersRouter)
app.use('/prompts', auth, promptsRouter)
app.use('/auth', authRouter)

const server = app.listen(3001, () =>
  console.log('🚀 Server ready at: http://localhost:3001')
)
