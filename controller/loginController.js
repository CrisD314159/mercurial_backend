import { verifyLogin } from './validations/loginValidations.js'

export default class MercurialControllerLogin {
  constructor ({ model }) {
    this.model = model
  }

  login = async (req, res) => {
    if (req.body) {
      const { email, password } = req.body
      const input = {
        email,
        password
      }
      const response = verifyLogin(input)
      if (response.success) {
        try {
          const loginResponse = await this.model.login(input)
          if (!loginResponse) return res.status(440).json({ success: false, message: 'Invalid credentials' })
          return res.cookie('authMercurial', loginResponse, { httpOnly: true, secure: false, sameSite: 'lax' }).json({ success: true, message: 'Login successfull' })
        } catch (e) {
          throw new Error(e)
        }
      } else {
        return res.status(440).json({ success: false, message: 'Invalid input' })
      }
    }
  }
}
