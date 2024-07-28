import nodemailer from 'nodemailer'
import fs from 'fs/promises' // Usando fs/promises en lugar de fs
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

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

export default class EmailService {
  static async sendEmailVerify (input) {
    const { email, verificationToken } = input
    try {
      let html = await loadHtmlFile(templatePath)
      html = replaceVariables(html, {
        url: `https://mercurial-app.vercel.app/users/verify/user/${verificationToken}`,
        text: 'Verificar cuenta',
        body: 'Haz clic en el siguiente botón para verificar tu cuenta:'
      })
      await sendEmail(html, 'Verify your account', email)
      return true
    } catch (e) {
      throw new Error(e)
    }
  }

  static async sendEmailResetPassword (input) {
    const { email, token } = input
    try {
      let html = await loadHtmlFile(templatePath)
      html = replaceVariables(html, {
        url: `https://mercurial-app.vercel.app/users/reset/password/${token}`,
        text: 'Restablecer Contraseña',
        body: 'Haz clic en el siguiente botón para restablecer tu contraseña:'
      })
      await sendEmail(html, 'Reset your password', email)
      return true
    } catch (e) {
      throw new Error(e)
    }
  }

  static async passwordChangeConfirmation (input) {
    const { email } = input
    try {
      let html = await loadHtmlFile(templatePath)
      html = replaceVariables(html, {
        url: 'https://mercurial-app.vercel.app/',
        text: 'Iniciar Sesión',
        body: 'Tu contraseña ha sido cambiada exitosamente.'
      })
      await sendEmail(html, 'Password changed', email)
      return true
    } catch (e) {
      throw new Error(e)
    }
  }
}

async function loadHtmlFile (filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return data
  } catch (error) {
    console.error('Error loading HTML file:', error)
    throw error
  }
}

function replaceVariables (html, variables) {
  let modifiedHtml = html
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g')
    modifiedHtml = modifiedHtml.replace(regex, value)
  }
  return modifiedHtml
}

async function sendEmail (htmlContent, subject, email) {
  const mailOptions = {
    from: `Mercurial Team <${process.env.EMAIL}>`,
    to: email,
    subject,
    html: htmlContent
  }

  try {
    const info = await smtp.sendMail(mailOptions)
    console.log('Email sent: ' + info.response)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
