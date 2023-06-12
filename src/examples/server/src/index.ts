import express from 'express'
import cors from 'cors'
import hardwareRouter from './hardware/index.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/hardware', hardwareRouter)

app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
