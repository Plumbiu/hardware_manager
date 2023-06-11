import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

app.put('/:id', async (req: any, res: any) => {
  const { id } = req.params
  const { name, type, row, col, box_num } = req.body
  console.log('put')
  try {
    const updatedHardware = await prisma.hardware.update({
      where: {
        id: +id
      },
      data: {
        name, type, row, col, box_num
      }
    })
    res.json({
      code: 2000,
      message: '请求成功',
      data: updatedHardware
    })
  } catch (error) {
    res.json({
      code: 4000,
      message: '请求失败'
    })
  }
})

app.get('/', async (req: any, res: any) => {
  try {
    const hareware = await prisma.hardware.findMany()
    res.json({
      code: 2000,
      message: '请求成功',
      data: hareware
    })
  } catch(err) {
    res.json({
      code: 4000,
      message: '请求失败'
    })
  }
})

app.delete('/:id', async (req: any, res: any) => {
  const { id } = req.params
  try {
    const deletedHardware = await prisma.hardware.delete({
      where: {
        id: +id
      }
    })
    res.json({
      code: 2000,
      message: '删除成功',
      data: deletedHardware
    })
  } catch (err) {
    res.json({
      code: 2000,
      message: '删除失败',
    })
  }
})


app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
