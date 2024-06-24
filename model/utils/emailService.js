import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
process.loadEnvFile()
const smtp = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD

  }
})

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const templatePath = path.join(__dirname, 'template.html')
let html = fs.readFileSync(templatePath, 'utf8')

export default class EmailService {
  static async sendEmailVerify (input) {
    const { email, id } = input
    try {
      const url = `https://mercurial-app.vercel.app/users/verify/user/${id}`
      html = html.replace('{{url}}', url).replace('{{text}}', 'Verificar cuenta').replace('{{body}}', 'Haz clic en el siguiente botón para verificar tu cuenta:')
      await smtp.sendMail({
        from: `Mercurial Team <${process.env.EMAIL}>`,
        to: email,
        subject: 'Welcome to Mercurial App, please verify your email',
        html
      })
      return true
    } catch (e) {
      throw new Error(e)
    }
  }

  static async sendEmailResetPassword (input) {
    const { email, id } = input
    try {
      const url = `https://mercurial-app.vercel.app/users/reset/password/${id}`
      html = html.replace('{{url}}', url).replace('{{text}}', 'Verificar cuenta').replace('{{body}}', 'Haz clic en el siguiente botón para restablecer tu contraseña:')

      await smtp.sendMail({
        from: `Mercurial Team <${process.env.EMAIL}>`,
        to: email,
        subject: 'Reset your password',
        html
      })
      return true
    } catch (e) {
      throw new Error(e)
    }
  }

  static async passwordChangeConfirmation (input) {
    const { email } = input
    try {
      const url = 'https://mercurial-app.vercel.app/'
      html = html.replace('{{url}}', url).replace('{{text}}', 'Iniciar Sesión').replace('{{body}}', 'Tu contraseña ha sido cambiada exitosamente.')

      await smtp.sendMail({
        from: `Mercurial Team <${process.env.EMAIL}>`,
        to: email,
        subject: 'Password changed',
        html
      })
      return true
    } catch (e) {
      throw new Error(e)
    }
  }
}
