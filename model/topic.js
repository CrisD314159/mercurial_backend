import { User } from './user.js'
import { sql } from './utils/bdConnection.js'
import { statesTopic } from './utils/states.js'
export class Topic {
  static async getTopicById (id) {
    const response = await sql`select * from topic where id = ${id} and state = ${statesTopic.active}`
    if (!response[0]) return false
    return response[0]
  }

  static async getUserTopics (id) {
    const exists = await User.getUser(id)
    if (!exists) {
      throw new Error('User does not exists')
    }
    const response = await sql`select * from topic where usuario_id = ${id} and state = ${statesTopic.active}`
    if (!response[0]) return false
    return response
  }

  static async createTopic (input, userId) {
    const { tittle, color } = input
    const exists = await User.getUser(userId)
    if (!exists) {
      throw new Error('User does not exists')
    }
    try {
      const id = crypto.randomUUID()
      await sql`insert into topic (id, tittle, usuario_id, color, state) values (${id}, ${tittle}, ${userId}, ${color}, ${statesTopic.active})`
      return this.getTopicById(id)
    } catch (error) {
      return false
    }
  }

  static async updateTopic (id, input) {
    const { tittle, color } = input
    const active = await this.getTopicById(id)
    if (!active) {
      throw new Error('Topic does not exists')
    }
    try {
      const response = sql.begin(async sql => {
        if (tittle) {
          await sql`update topic set tittle = ${tittle} where id = ${id}`
        }
        if (color) {
          await sql`update topic set color = ${color} where id = ${id}`
        }
        return true
      })
      return response
    } catch (e) {
      return false
    }
  }

  static async deleteTopic (id) {
    const active = await this.getTopicById(id)
    if (!active) {
      throw new Error('Topic does not exists')
    }
    try {
      await sql`update topic set state = ${statesTopic.deleted} where id = ${id}`
      return true
    } catch (e) {
      return false
    }
  }
}
