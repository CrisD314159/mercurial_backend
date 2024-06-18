import { verifytopic } from './validations/topicValidations.js'

export default class MercurialControllerTopic {
  constructor ({ model }) {
    this.model = model
  }

  // Metodos de tipo

  getTopicById = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const topic = await this.model.getTopicById(id)
        if (!topic) return res.status(440).json({ suceess: false, message: 'topic not found' })
        return res.json({ topic })
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  // Obtener las tareas de una asignatura
  getUsertopics = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const topic = await this.model.getUserTopics(id)
        if (!topic) return res.status(440).json({ suceess: false, message: 'topics not found' })
        return res.json({ topic })
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  // Crear una tarea
  createTopic = async (req, res) => {
    if (req.body) {
      const { title, color, userId } = req.body
      const input = {
        title,
        color
      }
      const response = verifytopic(input)
      if (response.success) {
        try {
          const topic = await this.model.createTopic(input, userId)
          if (!topic) return res.status(440).json({ success: false, message: 'Impossible to create topic' })
          return res.json({ success: true, message: 'Topic created' })
        } catch (e) {
          throw new Error(e)
        }
      } else {
        return res.status(440).json({ success: false, message: 'Invalid input' })
      }
    }
  }

  // Actualizar una tarea
  updateTopic = async (req, res) => {
    if (req.body && req.params.id) {
      const { id } = req.params
      const { title } = req.body
      const input = {
        title
      }
      const response = verifytopic(input)
      if (response.success) {
        try {
          const topic = await this.model.updateTopic(id, input)
          if (!topic) return res.status(440).json({ success: false, message: 'Impossible to update topic' })
          return res.json({ success: true, message: 'Topic updated' })
        } catch (e) {
          throw new Error(e)
        }
      } else {
        return res.status(440).json({ success: false, message: 'Invalid input' })
      }
    }
  }

  // Eliminar una tarea
  deleteTopic = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const topic = await this.model.deleteTopic(id)
        if (!topic) return res.status(440).json({ success: false, message: 'Impossible to delete topic' })
        return res.json({ success: true, message: 'Topic deleted' })
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
