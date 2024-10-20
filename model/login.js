import { User } from './user.js'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import { generateAccessToken, generateRefreshToken } from './utils/tokenGeneration.js'

export class Login {
  static async login (input) {
    const { email, password, fingerprint } = input
    const user = await User.getUserByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }
    const userPassword = user.password
    const userEmail = user.email
    const userImage = user.image
    const passwordVerify = await bcrypt.compare(password, userPassword)
    if (userEmail === email && passwordVerify) {
      const accessToken = generateAccessToken({ id: user.id, email: user.email })
      console.log(fingerprint)
      const refreshToken = await generateRefreshToken({ id: user.id, email: user.email }, fingerprint)
      return { accessToken, refreshToken, data: { userEmail, userImage } }
    } else {
      return false
    }
  }
}
