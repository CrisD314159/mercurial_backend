import { verifyUser, verifyUserPartial, verifyUserPasswordChange } from './validations/userValidations.js'
export class MercurialControllerUser {
  constructor ({ model }) {
    this.model = model
  }

  // Metodos de usuario

  // Obtener un usuario dado un id
  getUser = async (req, res) => {
    if (!req.session || req.session === 'expired') return res.clearCookie('authMercurial').status(401).json({ success: false, message: 'Unauthorized' })// Borrar la cookie
    const { id } = req.session.user
    if (id) {
      try {
        const user = await this.model.getUser(id)
        if (!user) return res.status(440).json({ suceess: false, message: 'User not found' })
        return res.json({ user })
      } catch (e) {
        throw new Error(e)
      }
    }
    return res.status(440).json({ suceess: false, message: 'Not id provided' })
  }

  // Crear un usuario
  createUser = async (req, res) => {
    if (req.body) {
      const { name, email, username, password, image } = req.body
      const input = {
        name,
        email,
        username,
        password,
        image
      }
      const respuesta = verifyUser(input)
      if (respuesta.success) {
        try {
          const user = await this.model.createUser(input)
          if (!user) return res.status(440).json({ suceess: false, message: 'Impossible to create user' })
          return res.status(201).json({ suceess: true, message: 'User created' })
        } catch (e) {
          throw new Error(e)
        }
      } else {
        return res.status(440).json({ suceess: false, message: 'Invalid input' })
      }
    }
  }

  // Actualizar un usuario dado un id
  updateUser = async (req, res) => {
    if (!req.session || req.session === 'expired') return res.clearCookie('authMercurial').status(401).json({ success: false, message: 'Unauthorized' })// Borrar la cookie
    if (req.body) {
      const { id } = req.session.user
      const { name, username, password, image } = req.body
      const input = {
        name,
        username,
        password,
        image
      }
      const response = verifyUserPartial(input)
      if (response.success) {
        try {
          const user = await this.model.updateUser(id, input)
          if (!user) return res.status(440).json({ suceess: false, message: 'User not found' })
          return res.status(200).status(440).json({ success: true, message: 'User updated' })
        } catch (e) {
          throw new Error(e)
        }
      } else {
        return res.status(440).json({ suceess: false, message: 'Invalid input' })
      }
    }
  }

  changePassword = async (req, res) => {
    if (req.body) {
      const { token, email, password } = req.body
      const input = {
        token,
        email,
        password
      }
      const response = verifyUserPasswordChange(input)
      if (response.success) {
        try {
          const user = await this.model.changePassword(input)
          if (!user) return res.status(440).json({ suceess: false, message: 'User not found' })
          return res.status(200).json({ success: true, message: 'Password changed' })
        } catch (e) {
          throw new Error(e)
        }
      } else {
        return res.status(440).json({ suceess: false, message: 'Invalid input' })
      }
    }
  }

  getEmailChangeToken = async (req, res) => {
    if (req.params.token) {
      const { token } = req.params
      try {
        const response = await this.model.getPasswordResetToken(token)
        if (!response) return res.status(440).json({ suceess: false, message: 'Impossible to get token' })
        return res.json({ success: true, message: 'Token sent', response })
      } catch (e) {
        throw new Error(e)
      }
    } else {
      return res.status(440).json({ suceess: false, message: 'Invalid input' })
    }
  }

  sendEmailChangePassword = async (req, res) => {
    if (req.body) {
      const { email } = req.body
      try {
        const user = await this.model.sendEmailChangePassword(email)
        if (!user) return res.status(440).json({ suceess: false, message: 'User not found' })
        return res.json({ success: true, message: 'Email sent' })
      } catch (e) {
        throw new Error(e)
      }
    } else {
      return res.status(440).json({ suceess: false, message: 'Invalid input' })
    }
  }

  // Eliminar un usuario dado un id
  deleteUser = async (req, res) => {
    if (!req.session || req.session === 'expired') return res.clearCookie('authMercurial').status(401).json({ success: false, message: 'Unauthorized' })// Borrar la cookie
    if (req.session) {
      const { id } = req.session.user
      try {
        const response = await this.model.deleteUser(id)
        if (!response) return res.status(440).json({ suceess: false, message: 'Impossible to delete user' })
        return res.status(200).json({ success: true, message: 'User deleted' })
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  // verificar la cuenta de un usuario
  verifyUser = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const response = await this.model.verifyUser(id)
        if (!response) return res.status(440).json({ suceess: false, message: 'Impossible to verify user' })
        return res.json({ success: true, message: 'User verified' })
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
