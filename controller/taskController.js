import { verifyTask } from './validations/taskValidations.js'

export default class MercurialControllerTask {
  constructor ({ model }) {
    this.model = model
  }

  // Metodos de tareas

  // Obtener una tarea dado un id
  getTaskId = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const task = await this.model.getTaskId(id)
        if (!task) return res.status(440).json({ suceess: false, message: 'Task not found' })
        return res.json({ task })
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  // Obtener las tareas de una asignatura
  getTasks = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const tasks = await this.model.getTasks(id)
        if (!tasks) return res.status(440).json({ success: false, message: 'Tasks not found' })
        return res.json({ tasks })
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  getUserTasks = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const tasksUser = await this.model.getUserTasks(id)
        if (!tasksUser) return res.status(440).json({ success: false, message: 'Tasks of the user not found' })
        return res.json({ tasksUser })
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  // Crear una tarea
  createTask = async (req, res) => {
    if (req.body) {
      const { tittle, description, subjectId, topicId } = req.body
      const input = {
        tittle,
        description
      }
      const response = verifyTask(input)
      if (response.success) {
        try {
          const task = await this.model.createTask(input, subjectId, topicId)
          if (!task) return res.status(440).json({ success: false, message: 'Impossible to create task' })
          return res.json({ success: true, message: 'Task created' })
        } catch (e) {
          throw new Error(e)
        }
      } else {
        return res.status(440).json({ success: false, message: 'Invalid input' })
      }
    }
  }

  // Actualizar una tarea dado un id
  updateTask = async (req, res) => {
    if (req.body && req.params.id) {
      const { id } = req.params
      const { tittle, description } = req.body
      const input = {
        tittle,
        description
      }
      const response = verifyTask(input)
      if (response.success) {
        try {
          const task = await this.model.updateTask(id, input)
          if (!task) return res.status(440).json({ success: false, message: 'Impossible to update task' })
          return res.json({ success: true, message: 'Task updated' })
        } catch (e) {
          throw new Error(e)
        }
      } else {
        return res.status(440).json({ success: false, message: 'Invalid input' })
      }
    }
  }

  // Eliminar una tarea
  deleteTask = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const task = await this.model.deleteTask(id)
        if (!task) return res.status(440).json({ success: false, message: 'Impossible to delete task' })
        return res.json({ success: true, message: 'Task deleted' })
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  // Obtener las tareas completadas de un usuario
  getDoneTasks = async (req, res) => {
    const { id } = req.body
    if (id) {
      try {
        const tasks = await this.model.getDoneTasks(id)
        if (!tasks) return res.status(440).json({ success: false, message: 'Tasks not found' })
        return res.json({ tasks })
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  // Marcar una tarea como completada
  markTaskAsDone = async (req, res) => {
    const { id } = req.params
    if (id) {
      try {
        const response = await this.model.markTaskAsDone(id)
        if (!response) return res.status(440).json({ success: false, message: 'Task not found' })
        return res.json({ success: true, message: 'Task marked as done' })
      } catch (error) {

      }
    }
  }

  rollBackTask = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const response = await this.model.rollBackTask(id)
        if (!response) return res.status(440).json({ success: false, message: 'Task not found' })
        return res.json({ success: true, message: 'Task rolled back' })
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
