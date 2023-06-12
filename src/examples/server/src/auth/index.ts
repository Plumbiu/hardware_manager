import { jwtSecretKey, AES_SECRET_KEY, AES_SECRET_IV } from './secretKeys.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { expressjwt } from 'express-jwt'
// 生成 token 函数

export function genToken(payload: any) {
  const token = `Bearer ${jwt.sign(payload, jwtSecretKey, {
    expiresIn: 60 * 60
  })}`
  return token
}
export const jwtAuth = expressjwt({
  secret: jwtSecretKey,
  algorithms: ['HS256'],
  credentialsRequired: true,
  getToken: (req: any) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1]
    } else if (req.query && req.query.token) {
      return req.query.token
    }
  }
}).unless({
  path: ['/api/user/login', '/api/user/signup']
})
// 加密算法
export function encrypt(password: string) {
  let decipher = crypto.createCipheriv('aes-256-cbc', AES_SECRET_KEY, AES_SECRET_IV)
  return decipher.update(password, 'binary', 'hex') + decipher.final('hex')
}
// 解密算法
export function decrypt(crypted: string ) {
  crypted = Buffer.from(crypted, 'hex').toString('binary')
  let decipher = crypto.createDecipheriv('aes-256-cbc', AES_SECRET_KEY, AES_SECRET_IV)
  return decipher.update(crypted, 'binary', 'utf-8') + decipher.final('utf-8')
}
