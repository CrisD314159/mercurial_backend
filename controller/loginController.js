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
          return res.cookie('authMercurial', loginResponse.token, { httpOnly: true, secure: true, sameSite: 'lax' }).json({ success: true, message: 'Login successfull', data: loginResponse.data })
        } catch (e) {
          return res.status(440).json({ success: false, message: 'Expired Token' })
        }
      } else {
        return res.status(440).json({ success: false, message: 'Invalid credentials' })
      }
    }
  }

  logout = async (req, res) => {
    return res.clearCookie('authMercurial').json({ success: true, message: 'Logout successfull' })
  }
}
