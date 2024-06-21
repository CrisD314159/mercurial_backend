import nodemailer from 'nodemailer'
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

export default class EmailService {
  static async sendEmailVerify (input) {
    const { email, id } = input
    try {
      await smtp.sendMail({
        from: `Mercurial Team <${process.env.EMAIL}>`,
        to: email,
        subject: 'Welcome to Mercurial App, please verify your email',
        html: `
        <p>Estimado usuario,</p>
        <p>Haz clic en el siguiente botón para verificar tu cuenta:</p>
        <a href="https://mercurial-app.vercel.app/users/reset/password/${id}" class="button"><button>Verificar cuenta</button></a>
        <p>Equipo de Mercurial</p>`
      })
      return true
    } catch (e) {
      throw new Error(e)
    }
  }

  static async sendEmailResetPassword (input) {
    const { email, id } = input
    try {
      await smtp.sendMail({
        from: `Mercurial Team <${process.env.EMAIL}>`,
        to: email,
        subject: 'Reset your password',
        html: `
        <p>Estimado usuario,</p>
        <p>Haz clic en el siguiente botón para resetear tu contraseña:</p>
        <a href="https://mercurial-app.vercel.app/users/reset/password/${id}" class="button"><button>Resetear contraseña</button></a>
        <p>Equipo de Mercurial</p>`
      })
      return true
    } catch (e) {
      throw new Error(e)
    }
  }

  static async passwordChangeConfirmation (input) {
    const { email } = input
    try {
      await smtp.sendMail({
        from: `Mercurial Team <${process.env.EMAIL}>`,
        to: email,
        subject: 'Password changed',
        html: `
        <p>Estimado usuario,</p>
        <p>Tu contraseña ha sido cambiada exitosamente.</p>
        <p>Equipo de Mercurial</p>`
      })
      return true
    } catch (e) {
      throw new Error(e)
    }
  }
}
