import jwt from 'jsonwebtoken'
export const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const auth = req.headers.authorization.split(' ')[1]
  // const {auth} = req.cookies;
  try {
    if (!auth) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const data = jwt.verify(auth, process.env.JWT_PASSWORD)

    if (!data) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.session = { user: data.user }
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' })
    }
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export const checkAuthStatus = async (req, res) => {
  const { user } = req.session
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  return res.status(200).json({ message: 'Authorized' })
}
