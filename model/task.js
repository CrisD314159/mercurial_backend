import { Subject } from './subject.js'
import { Topic } from './topic.js'
import { sql } from './utils/bdConnection.js'
import { statesTask } from './utils/states.js'
import { User } from './user.js'

export class Task {
  static async getTaskById (id) {
    const response = await sql`
    SELECT t.id, t.tittle, t.description, s.id as stateId, s.name as stateName, sub.id as subjectId, sub.name as subjectName, top.color as topicColor, top.id as topicId, top.tittle as topicTittle FROM task t 
    JOIN state s on t.state_id = s.id
    JOIN subject sub on t.subject_id = sub.id
    JOIN topic top on t.topic_id = top.id
    WHERE t.id = ${id} AND t.state_id = ${statesTask.active};`
    if (!response[0] || response[0].stateid === statesTask.done) return false
    return response[0]
  }

  static async getTaskByIdDone (id) {
    const response = await sql`
    SELECT * from task 
    WHERE id = ${id} AND state_id = ${statesTask.done};`
    if (!response[0]) return false
    return response[0]
  }

  static async getTasks (id) {
    const exists = await Subject.getSubjectById(id)
    if (!exists) {
      throw new Error('Subject does not exists')
    }
    const response = await sql`
      SELECT t.id, t.tittle, t.description, s.id as stateId, s.name as stateName, sub.id as subjectId, sub.name as subjectName, top.color as topicColor, top.id as topicId, top.tittle as topicTittle FROM task t 
      JOIN state s on t.state_id = s.id
      JOIN subject sub on t.subject_id = sub.id
      JOIN topic top on t.topic_id = top.id
      WHERE t.subject_id = ${id} AND t.state_id = ${statesTask.active};`
    if (!response[0]) return false
    return response
  } // falta agregar método filtrar por tipo

  static async getTasksBySubject (id) {
    const exists = await Subject.getSubjectById(id)
    if (!exists) {
      throw new Error('Subject does not exists')
    }
    const response = await sql`
      SELECT t.id, t.tittle FROM task t 
      WHERE t.subject_id = ${id} AND t.state_id = ${statesTask.active};`
    if (!response[0]) return false
    return response
  }

  static async getTasksByTopic (id) {
    const exists = await Topic.getTopicById(id)
    if (!exists) {
      throw new Error('Subject does not exists')
    }
    const response = await sql`
      SELECT t.id, t.tittle FROM task t 
      WHERE t.topic_id = ${id} AND t.state_id = ${statesTask.active};`
    if (!response[0]) return false
    return response
  }

  static async getUserTasks (id) {
    const exists = await User.getUser(id)
    if (!exists) {
      throw new Error('User does not exists')
    }
    const response = await sql`
      SELECT t.id, t.tittle, t.description, s.id as stateId, s.name as stateName, sub.id as subjectId, sub.name as subjectName, top.color as topicColor, top.id as topicId, top.tittle as topicTittle  FROM task t 
      JOIN state s on t.state_id = s.id
      JOIN subject sub on t.subject_id = sub.id
      JOIN topic top on t.topic_id = top.id
      WHERE sub.usuario_id = ${id} AND t.state_id = ${statesTask.active}`
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
      return this.getTaskById(id)
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
      const response = await sql.begin(async sql => {
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

  static async getDoneTasks (id) {
    const exists = await User.getUser(id)
    if (!exists) {
      throw new Error('User does not exists')
    }
    const response = await sql`
      SELECT t.id, t.tittle, t.description, s.id as stateId, s.name as stateName, sub.id as subjectId, sub.name as subjectName, top.color as topicColor, top.id as topicId, top.tittle as topicTittle  FROM task t 
      JOIN state s on t.state_id = s.id
      JOIN subject sub on t.subject_id = sub.id
      JOIN topic top on t.topic_id = top.id
      WHERE sub.usuario_id = ${id} AND t.state_id = ${statesTask.done}`
    if (!response[0]) return false
    return response
  }

  static async markTaskAsDone (id) {
    const active = await this.getTaskById(id)
    if (!active) {
      throw new Error('Task does not exists')
    }
    try {
      await sql`update task set state_id = ${statesTask.done} where id = ${id}`
      return true
    } catch (error) {
      return false
    }
  }

  static async rollBackTask (id) {
    const done = await this.getTaskByIdDone(id)
    if (!done) {
      throw new Error('Task does not exists')
    }
    try {
      await sql`update task set state_id = ${statesTask.active} where id = ${id}`
      return true
    } catch (error) {
      return false
    }
  }
}
