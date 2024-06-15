import { User } from './User.js'
import { sql } from './utils/bdConnection.js'
import { statesSubject } from './utils/states.js'
export class Subject {
  static async getSubjectById (id) {
    const response = await sql`select * from subject where id = ${id} and state_id = ${statesSubject.active}`
    if (!response[0]) return false
    return response[0]
  }

  static async getUserSubjects (id) {
    const exists = await User.getUser(id)
    if (!exists) {
      throw new Error('User does not exists')
    }
    const response = await sql`select * from subject where usuario_id = ${id} and state_id = ${statesSubject.active}`
    if (!response[0]) return false
    return response
  }

  static async createSubject (input, userId) {
    const { name, color } = input
    const exists = await User.getUser(userId)
    if (!exists) {
      throw new Error('User does not exists')
    }
    try {
      const id = crypto.randomUUID()
      await sql`insert into subject (id, name, state_id, usuario_id, color) values (${id}, ${name}, ${statesSubject.active}, ${userId}, ${color})`
      return true
    } catch (error) {
      return false
    }
  }

  static async updateSubject (id, input) {
    const { name, color } = input
    const active = await this.getSubjectById(id)
    if (!active) {
      throw new Error('Subject does not exists')
    }
    try {
      const response = sql.begin(async sql => {
        if (name) {
          await sql`update subject set name = ${name} where id = ${id}`
        }
        if (color) {
          await sql`update subject set color = ${color} where id = ${id}`
        }
        return true
      })

      return response
    } catch (e) {
      return false
    }
  }

  static async deleteSubject (id) {
    const active = await this.getSubjectById(id)
    if (!active) {
      throw new Error('Subject does not exists')
    }
    try {
      await sql`update subject set state_id = ${statesSubject.deleted} where id = ${id}`
      return true
    } catch (error) {
      return false
    }
  }
}
