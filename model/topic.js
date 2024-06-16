import { User } from './User.js'
import { sql } from './utils/bdConnection.js'
import { statesTopic } from './utils/states.js'
export class Topic {
  static async getTopicId (id) {
    const response = await sql`select * from topic where id = ${id} and state_id = ${statesTopic.active}`
    if (!response[0]) return false
    return response[0]
  }

  static async getUserTopics (id) {
    const exists = await User.getUser(id)
    if (!exists) {
      throw new Error('User does not exists')
    }
    const response = await sql`select * from topic where user_id = ${id}`
    if (!response[0]) return false
    return response
  }

  static async createTopic (input, userId) {
    const { title } = input
    const exists = await User.getUser(userId)
    if (!exists) {
      throw new Error('User does not exists')
    }
    try {
      const id = crypto.randomUUID()
      await sql`insert into topic (id, title, user_id) values (${id}, ${title}, ${userId})`
      return true
    } catch (error) {
      return false
    }
  }

  static async updateTopic (id, input) {
    const { title } = input
    const active = await this.getTopicId(id)
    if (!active) {
      throw new Error('Topic does not exists')
    }
    try {
      const response = sql.begin(async sql => {
        if (title) {
          await sql`update topic set title = ${title} where id = ${id}`
        }
        return true
      })

      return response
    } catch (e) {
      return false
    }
  }

  static async deleteTopic (id) {
    const active = await this.getTopicId(id)
    if (!active) {
      throw new Error('Topic does not exists')
    }
    try {
      await sql`update topic set state_id = ${statesTopic.inactive} where id = ${id}`
      return true
    } catch (e) {
      return false
    }
  }
}
