import express from 'express'
import cors from 'cors'
import hardwareRouter from './hardware/index.js'
import userRouter from './user/index.js'
import { jwtAuth } from './auth/index.js'
const app = express()
app.use(cors())

app.use(jwtAuth)
app.use(express.json())
app.use('/api/hardware', hardwareRouter)
app.use('/api/user', userRouter)
app.listen(3000, () =>
  console.log(`
    🚀 Server ready at: http://localhost:3000
  `)
)
