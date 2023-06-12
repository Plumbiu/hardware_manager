import express from 'express'
const router = express.Router()
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// 更新单个硬件
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, type, row, col, box_num } = req.body
  console.log('put')
  try {
    const updatedHardware = await prisma.hardware.update({
      where: {
        id: +id,
      },
      data: {
        name,
        type,
        row,
        col,
        box_num,
      },
    })
    res.json({
      code: 2000,
      message: '请求成功',
      data: updatedHardware,
    })
  } catch (error) {
    res.json({
      code: 4000,
      message: '请求失败',
    })
  }
})
// 获取所有硬件
router.get('/', async (req, res) => {
  try {
    const hareware = await prisma.hardware.findMany()
    res.json({
      code: 2000,
      message: '请求成功',
      data: hareware,
    })
  } catch (err) {
    res.json({
      code: 4000,
      message: '请求失败',
    })
  }
})
// 删除单个硬件
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deletedHardware = await prisma.hardware.delete({
      where: {
        id: +id,
      },
    })
    res.json({
      code: 2000,
      message: '删除成功',
      data: deletedHardware,
    })
  } catch (err) {
    res.json({
      code: 2000,
      message: '删除失败',
    })
  }
})
// 增加单个硬件
router.post('/', async (req, res) => {
  const { name, type, col, row, box_num } = req.body
  console.log(req.body)
  
  try {
    const postedHarware = await prisma.hardware.create({
      data: { name, type, col, row, box_num }
    })
    res.json({
      code: 2000,
      message: '添加硬件成功',
      data: postedHarware
    })
    console.log('done')
    
  } catch (err) {
    console.log(err)
    
    res.json({
      code: 4000,
      message: '添加硬件失败'
    })
  }
})

export default router
