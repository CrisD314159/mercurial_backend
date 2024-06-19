import { Router } from 'express'
import multer from 'multer'
import { MercurialControllerUser } from '../controller/userController.js'
import MercurialControllerSubject from '../controller/subjectController.js'
import MercurialControllerTask from '../controller/taskController.js'
import MercurialControllerTopic from '../controller/topicController.js'
import ImageController from '../controller/imageController.js'

export default function Routes ({ model }) {
  const router = Router()
  const userController = new MercurialControllerUser({ model })
  const subjectController = new MercurialControllerSubject({ model })
  const taskController = new MercurialControllerTask({ model })
  const topicController = new MercurialControllerTopic({ model })
  const imageController = new ImageController({ model })
  const upload = multer({ dest: 'uploads/' })
  /**
   en los controladores usamos metodos flecha (arrow functions)
   method = async(req, res) => {}

    en vez de los metodo tradicionales
    async function(req, res) {}

    esto porque los metodos flecha no crean un nuevo contexto de this, por lo que no es necesario hacer un bind
    por lo tanto son mejores y mas faciles de usar
   */

  // Métodos de usuario
  router.get('/users/:id', userController.getUser) // obtener un usuario dado un id
  router.post('/users', userController.createUser) // crear un usuario
  router.put('/users/:id', userController.updateUser) // actualizar un usuario dado un id
  router.delete('/users/:id', userController.deleteUser) // eliminar un usuario dado un id
  router.put('/users/password/change', userController.changePassword) // cambiar la contraseña de un usuario

  // Metodos de asignaturas
  router.get('/subjects/:id', subjectController.getSubjectById) // obtener una asignatura dado un id
  router.get('/subjects/user/:id', subjectController.getUserSubjects)
  router.post('/subjects', subjectController.createSubject)
  router.put('/subjects/:id', subjectController.updateSubject)
  router.delete('/subjects/:id', subjectController.deleteSubject)

  // Métodos de tareas
  router.get('/taks/:id', taskController.getTaskId)
  router.get('/tasks/subject/:id', taskController.getTasks)
  router.get('/tasks/user/:id', taskController.getUserTasks)
  router.post('/tasks', taskController.createTask)
  router.put('/tasks/:id', taskController.updateTask)
  router.delete('/tasks/:id', taskController.deleteTask)

  // Métodos de tipo
  router.get('/topics/:id', topicController.getTopicById)
  router.get('/topics/user/:id', topicController.getUsertopics)
  router.post('/topics', topicController.createTopic)
  router.put('/topics/:id', topicController.updateTopic)
  router.delete('/topics/:id', topicController.deleteTopic)

  // ruta de image
  router.post('/image/cloudinary', upload.single('image'), imageController.uploadImage)

  return router
}

// hola cris _v

/*
  Export= permite exportar varias clases o metodos con el fin de que pueda ser importado en otro archivo
  Export default = permite exportar un clase o metodo por defecto, es decir, que no necesita ser importado con el mismo nombre
  Solo se puede exportar uni

*/
