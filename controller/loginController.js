import { deleteSession } from '../model/utils/tokenQueries.js'
import { verifyLogin } from './validations/loginValidations.js'

export default class MercurialControllerLogin {
  constructor ({ model }) {
    this.model = model
  }

  login = async (req, res) => {
    if (req.body) {
      const { email, password } = req.body
      const ip = req.ip
      const userAgent = req.headers['user-agent']
      const fingerprint = `${ip}${userAgent}`
      const input = {
        email,
        password,
        fingerprint
      }
      const response = verifyLogin(input)
      if (response.success) {
        try {
          const loginResponse = await this.model.login(input)
          if (!loginResponse) return res.status(440).json({ success: false, message: 'Invalid credentials' })
          // return res.cookie('authMercurial', loginResponse.token, { httpOnly: true, secure: true, sameSite: 'none' }).json({ success: true, message: 'Login successfull', data: loginResponse.data })
          return res.json({ success: true, message: 'Login successfull', data: loginResponse.data, accessToken: loginResponse.accessToken, refreshToken: loginResponse.refreshToken })
        } catch (e) {
          return res.status(440).json({ success: false, message: e.message })
        }
      } else {
        return res.status(440).json({ success: false, message: 'Invalid credentials' })
      }
    }
  }

  logout = async (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) return res.status(440).json({ success: false, message: 'Impossible to logout' })
    try {
      const deleteSessionResponse = await deleteSession(refreshToken)
      if (!deleteSessionResponse) return res.status(440).json({ success: false, message: 'Impossible to logout' })
      return res.json({ success: true, message: 'Logout successfull' })
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
