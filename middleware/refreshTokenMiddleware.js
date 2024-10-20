import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { getSession } from '../model/utils/tokenQueries.js'
export const checkRefresh = async (req, res, next) => {
  const { refreshToken } = req.body
  const ip = req.ip
  const userAgent = req.headers['user-agent']
  const fingerprint = `${ip}${userAgent}`

  // reemplazarlo por un metodo aparte que vaya a la base de datos
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const valid = await getSession(refreshToken)
  if (!valid) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const validFingerprint = await bcryptjs.compare(fingerprint, valid.fingerprint)

  if (!refreshToken || !valid || !validFingerprint) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  try {
    const check = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
    if (!check) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.session = { user: check.user }
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' })
    }
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
