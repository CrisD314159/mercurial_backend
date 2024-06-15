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
  getUserTasks = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const tasks = await this.model.getUserTasks(id)
        if (!tasks) return res.status(440).json({ success: false, message: 'Tasks not found' })
        return res.json({ tasks })
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  // Crear una tarea
  createTask = async (req, res) => {
    if (req.body) {
      const { title, description, subjectId } = req.body
      const input = {
        title,
        description
      }
      const response = verifyTask(input)
      if (response.success) {
        try {
          const task = await this.model.createTask(input, subjectId)
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
      const { title, description } = req.body
      const input = {
        title,
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
}
