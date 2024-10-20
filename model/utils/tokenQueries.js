import { sql } from './bdConnection.js'

export async function createSession ({ refreshToken, fingerprint, userId }) {
  try {
    const response = await sql.begin(async sql => {
      if (!refreshToken || !fingerprint || !userId) {
        return false
      }
      const exists = await sql`select * from user_session where user_id = ${userId}`
      if (exists[0]) {
        const clear = await clearSessions(userId)
        if (!clear) {
          return false
        }
      }
      await sql`insert into user_session (token, fingerprint, user_id) values (${refreshToken}, ${fingerprint}, ${userId})`
      return true
    })
    return response
  } catch (error) {
    throw new Error('Impossible to create session', error.message)
  }
}

export async function deleteSession (refreshToken) {
  try {
    const response = await sql.begin(async sql => {
      if (!refreshToken) {
        return false
      }
      await sql`delete from user_session where token = ${refreshToken}`
      return true
    })
    return response
  } catch (error) {
    throw new Error('Impossible to delete session')
  }
}

export async function getSession (refreshToken) {
  try {
    const response = await sql`select * from user_session where token = ${refreshToken}`
    return response[0]
  } catch (error) {
    throw new Error('Impossible to get session')
  }
}

export async function clearSessions (userId) {
  try {
    const response = await sql.begin(async sql => {
      if (!userId) {
        return false
      }
      await sql`delete from user_session where user_id = ${userId}`
      return true
    })
    return response
  } catch (error) {
    throw new Error('Impossible to delete sessions')
  }
}
