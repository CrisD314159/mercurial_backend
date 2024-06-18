import { Subject } from './subject.js'
import { Topic } from './topic.js'
import { sql } from './utils/bdConnection.js'
import { statesTask } from './utils/states.js'

export class Task {
  static async getTaskById (id) {
    const response = await sql`select * from task where id = ${id} and state_id = ${statesTask.active}`
    if (!response[0]) return false
    return response[0]
  }

  static async getTasks (id) {
    const exists = await Subject.getSubjectById(id)
    if (!exists) {
      throw new Error('Subject does not exists')
    }
    const response = await sql`select * from task where subject_id = ${id} and state_id = ${statesTask.active} and topic_id = ${id}`
    if (!response[0]) return false
    return response
  }

  static async createTask (input, subjectId, topicId) {
    const { tittle, description } = input
    const exists = await Subject.getSubjectById(subjectId) && await Topic.getTopicById(topicId)
    if (!exists) {
      throw new Error('Subject does not exists')
    }
    try {
      const id = crypto.randomUUID()
      await sql`insert into task (id, tittle, description, state_id, subject_id, topic_id) values (${id}, ${tittle}, ${description}, ${statesTask.active}, ${subjectId}, ${topicId})`
      return true
    } catch (error) {
      return false
    }
  }

  static async updateTask (id, input) {
    const { tittle, description } = input
    const active = await this.getTaskById(id)
    if (!active) {
      throw new Error('Task does not exists')
    }
    try {
      const response = sql.begin(async sql => {
        if (tittle) {
          await sql`update task set tittle = ${tittle} where id = ${id}`
        }
        if (description) {
          await sql`update task set description = ${description} where id = ${id}`
        }
        return true
      })

      return response
    } catch (e) {
      return false
    }
  }

  static async deleteTask (id) {
    const active = await this.getTaskById(id)
    if (!active) {
      throw new Error('Task does not exists')
    }
    try {
      await sql`update task set state_id = ${statesTask.deleted} where id = ${id}`
      return true
    } catch (error) {
      return false
    }
  }
}
