import { User } from './User.js'
import { Subject } from './subject.js'
import { Task } from './task.js'
import { Topic } from './topic.js'
import ImageCloudinary from './utils/imageService.js'

export class MercurialModel {
  // Metodos de usuario
  static async getUser (id) {
    const response = await User.getUser(id)
    return response
  }

  static async createUser (input) {
    const response = await User.createUser(input)
    return response
  }

  static async updateUser (id, input) {
    const response = await User.updateUser(id, input)
    return response
  }

  static async deleteUser (id) {
    const response = await User.deleteUser(id)
    return response
  }

  // Metodos de asignaturas

  static async getSubjectById (id) {
    const response = await Subject.getSubjectById(id)
    return response
  }

  static async getUserSubjects (id) {
    const response = await Subject.getUserSubjects(id)
    return response
  }

  static async createSubject (input, userId) {
    const response = await Subject.createSubject(input, userId)
    return response
  }

  static async updateSubject (id, input) {
    const response = await Subject.updateSubject(id, input)
    return response
  }

  static async deleteSubject (id) {
    const response = await Subject.deleteSubject(id)
    return response
  }

  // Metodos de tipo

  static async getTopicId (id) {
    const response = await Topic.getTopicId(id)
    return response
  }

  static async getUserTopics (id) {
    const response = await Topic.getUserTopics(id)
    return response
  }

  static async createTopic (input, userId) {
    const response = await Topic.createTopic(input, userId)
    return response
  }

  static async updateTopic (id, input) {
    const response = await Topic.updateTopic(id, input)
    return response
  }

  static async deleteTopic (id) {
    const response = await Topic.deleteTopic(id)
    return response
  }

  // Metodos de tareas

  static async getTaskById (id) {
    const response = await Task.getTaskById(id)
    return response
  }

  static async getTasks (id) {
    const response = await Task.getTasks(id)
    return response
  }

  static async createTask (input, subjectId, topicId) {
    const response = await Task.createTask(input, subjectId, topicId)
    return response
  }

  static async updateTask (id, input) {
    const response = await Task.updateTask(id, input)
    return response
  }

  static async deleteTask (id) {
    const response = await Task.deleteTask(id)
    return response
  }

  static async uploadImage (image) {
    const response = await ImageCloudinary.uploadImage(image)
    return response
  }
}
