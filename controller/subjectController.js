import { verifySubject } from './validations/subjectValidations.js'

export default class MercurialControllerSubject {
  constructor ({ model }) {
    this.model = model
  }

  // Metodos de asignaturas

  // Obtener una asignatura dado un id
  getSubjectById = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const subject = await this.model.getSubjectById(id)
        if (!subject) return res.status(440).json({ suceess: false, message: 'Subject not found' })
        return res.json({ subject })
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  // Obtener las asignaturas de un usuario
  getUserSubjects = async (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Unauthorized' })
    if (req.params.id) {
      const { id } = req.params
      try {
        const subjects = await this.model.getUserSubjects(id)
        if (!subjects) return res.status(440).json({ suceess: false, message: 'Subjects not found' })
        return res.json({ subjects })
      } catch (e) {
        throw new Error(e)
      }
    }
  }

  // Crear una asignatura
  createSubject = async (req, res) => {
    if (req.body) {
      const { name, color, userId } = req.body
      const input = {
        name,
        color
      }
      const response = verifySubject(input)
      if (response.success) {
        try {
          const subject = await this.model.createSubject(input, userId)
          if (!subject) return res.status(440).json({ success: false, message: 'Impossible to create subject' })
          return res.json({ success: true, message: 'Subject created' })
        } catch (e) {
          throw new Error(e)
        }
      } else {
        return res.status(440).json({ success: false, message: 'Invalid input' })
      }
    }
  }

  updateSubject = async (req, res) => {
    if (req.body && req.params.id) {
      const { id } = req.params
      const { name, color } = req.body
      const input = {
        name,
        color
      }
      const response = verifySubject(input)
      if (response.success) {
        try {
          const subject = await this.model.updateSubject(id, input)
          if (!subject) return res.status(440).json({ success: false, message: 'Impossible to update subject' })
          return res.json({ success: true, message: 'Subject updated' })
        } catch (e) {
          throw new Error(e)
        }
      } else {
        return res.status(440).json({ success: false, message: 'Invalid input' })
      }
    }
  }

  deleteSubject = async (req, res) => {
    if (req.params.id) {
      const { id } = req.params
      try {
        const subject = await this.model.deleteSubject(id)
        if (!subject) return res.status(440).json({ success: false, message: 'Impossible to delete subject' })
        return res.json({ success: true, message: 'Subject deleted' })
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
