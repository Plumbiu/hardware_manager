import express from 'express'
const router = express.Router()
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { genToken, decrypt, encrypt } from '../auth/index.js'
import { handleRole } from './handleRole.js'

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  
  const token = genToken({ email })
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    if(user === null) {
      throw new Error('未知用户名')
    }
    if(decrypt(user.password) !== password) {
      throw new Error('用户名或密码错误')
    }
    res.json({
      code: 2000,
      message: '登录成功',
      token
    })
  } catch(error: any) {
    res.json({
      code: 4000,
      message: error.message
    })
  }
})
router.post('/signup', async (req, res) => {
  const { email, password, invitationCode } = req.body
  console.log(email, password, invitationCode)
  
  try {
    await prisma.user.create({
      data: {
        email,
        password: encrypt(password),
        role: handleRole(invitationCode)
      }
    })
    res.json({
      code: 2000,
      message: '用户注册成功'
    })
  } catch(error) {
    res.json({
      code: 4000,
      message: '用户注册失败'
    })
  }
})


export default router