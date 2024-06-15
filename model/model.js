import { User } from './User.js'
import { Subject } from './subject.js'

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

  // Metodos de tareas
}
