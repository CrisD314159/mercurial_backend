import { User } from './user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class Login {
  static async login (input) {
    const { email, password } = input
    const user = await User.getUserByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }
    const userPassword = user.password
    const userEmail = user.email
    const userImage = user.image
    const passwordVerify = await bcrypt.compare(password, userPassword)
    if (userEmail === email && passwordVerify) {
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_PASSWORD, { expiresIn: '7h' })
      return { token, data: { userEmail, userImage } }
    } else {
      return false
    }
  }
}
