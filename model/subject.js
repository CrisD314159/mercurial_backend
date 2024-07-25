import { Task } from './task.js'
import { User } from './user.js'
import { sql } from './utils/bdConnection.js'
import { statesSubject } from './utils/states.js'
export class Subject {
  static async getSubjectById (id) {
    const response = await sql`
    SELECT sub.id, sub.name, sub.color, s.id as state_id, s.name as state_name, u.id as user_id, u.name as user_name, u.image as user_image FROM subject sub
    JOIN state s on sub.state_id = s.id
    JOIN usuario u on sub.usuario_id = u.id
    WHERE sub.id = ${id} AND sub.state_id = ${statesSubject.active};`
    if (!response[0]) return false
    return response[0]
  }

  static async getUserSubjects (id) {
    const exists = await User.getUser(id)
    if (!exists) {
      throw new Error('User does not exists')
    }
    const response = await sql`
    SELECT sub.id, sub.name, sub.color, s.id as state_id, s.name as state_name, u.id as user_id, u.name as user_name FROM subject sub
    JOIN state s on sub.state_id = s.id
    JOIN usuario u on sub.usuario_id = u.id
    WHERE u.id = ${id} AND sub.state_id = ${statesSubject.active}`
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
      return this.getSubjectById(id)
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

      if (response) {
        return this.getSubjectById(id)
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }

  static async deleteSubject (id) {
    const active = await this.getSubjectById(id)
    const tasks = await Task.getTasksBySubject(id)
    if (!active) {
      throw new Error('Subject does not exists')
    }
    if (tasks) {
      throw new Error('Subject has pending tasks')
    }
    try {
      await sql`update subject set state_id = ${statesSubject.deleted} where id = ${id}`
      return true
    } catch (error) {
      return false
    }
  }
}
