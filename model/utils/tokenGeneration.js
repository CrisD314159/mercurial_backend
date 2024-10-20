import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createSession, deleteSession } from './tokenQueries.js'

export function generateAccessToken (user) {
  try {
    if (user) {
      const accessToken = jwt.sign({ user }, process.env.JWT_PASSWORD, { expiresIn: '30m' })
      return accessToken
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
export async function generateRefreshToken (user, fingerprint) {
  try {
    if (user && fingerprint) {
      const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN, { expiresIn: '7d' })
      const sessionFingerprint = await bcryptjs.hash(`${fingerprint}`, 10)
      // Add the refresh token to the database
      const pushResponse = await createSession({ refreshToken, fingerprint: sessionFingerprint, userId: user.id })
      if (!pushResponse) {
        throw new Error('Impossible to create session')
      }
      return refreshToken
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export async function clearRefreshToken (refreshToken) {
  try {
    if (!refreshToken) {
      throw new Error('No token provided')
    }
    const deleteSessionResponse = await deleteSession(refreshToken)
    if (!deleteSessionResponse) {
      throw new Error('Impossible to delete session')
    }
    return true
  } catch (error) {
    throw new Error(error.message)
  }
}

export const refreshToken = async (req, res) => {
  const { user } = req.session
  try {
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const accessToken = generateAccessToken(user)
    return res.status(201).json({ accessToken })
  } catch (error) {
    throw new Error(error.message)
  }
}
