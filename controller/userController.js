import { verifyUser, verifyUserPartial } from './validations/userValidations.js'
export class MercurialControllerUser {
  constructor ({ model }) {
    this.model = model
  }

  // Metodos de usuario

  // Obtener un usuario dado un id
  getUser = async (req, res) => {
    const { id } = req.params
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
    if (!req.session) return res.status(401).json({ success: false, message: 'Unauthorized' })
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
          return res.status(204).status(440).json({ success: true, message: 'User updated' })
        } catch (e) {
          throw new Error(e)
        }
      }
    }
  }

  changePassword = async (req, res) => {
    if (req.body) {
      const { id, email, password } = req.body
      const input = {
        email,
        password
      }
      const response = verifyUserPartial(input)
      if (response.success) {
        try {
          const user = await this.model.changePassword(id, input)
          if (!user) return res.status(440).json({ suceess: false, message: 'User not found' })
          return res.status(204).json({ success: true, message: 'Password changed' })
        } catch (e) {
          throw new Error(e)
        }
      }
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
    }
  }

  // Eliminar un usuario dado un id
  deleteUser = async (req, res) => {
    if (!req.session) return res.status(401).json({ success: false, message: 'Unauthorized' })
    if (req.params.id) {
      const { id } = req.params
      try {
        const response = await this.model.deleteUser(id)
        if (!response) return res.status(440).json({ suceess: false, message: 'Impossible to delete user' })
        return res.status(204).json({ success: true, message: 'User deleted' })
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
