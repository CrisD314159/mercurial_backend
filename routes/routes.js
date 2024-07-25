import { Router } from 'express'
import multer from 'multer'
import { MercurialControllerUser } from '../controller/userController.js'
import MercurialControllerSubject from '../controller/subjectController.js'
import MercurialControllerTask from '../controller/taskController.js'
import MercurialControllerTopic from '../controller/topicController.js'
import MercurialControllerLogin from '../controller/loginController.js'
import ImageController from '../controller/imageController.js'

export default function Routes ({ model }) {
  const router = Router()
  const userController = new MercurialControllerUser({ model })
  const subjectController = new MercurialControllerSubject({ model })
  const taskController = new MercurialControllerTask({ model })
  const topicController = new MercurialControllerTopic({ model })
  const imageController = new ImageController({ model })
  const loginController = new MercurialControllerLogin({ model })
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
  router.get('/users', userController.getUser) // obtener un usuario dado un id
  router.post('/users', userController.createUser) // crear un usuario
  router.put('/users', userController.updateUser) // actualizar un usuario dado un id
  router.delete('/users', userController.deleteUser) // eliminar un usuario dado un id
  router.put('/users/password/change', userController.changePassword) // cambiar la contraseña de un usuario
  router.post('/users/password/change/email', userController.sendEmailChangePassword) // enviar un correo para cambiar la contraseña
  router.put('/users/account/verify/:id', userController.verifyUser) // verificar un usuario dado un id

  // Metodos de asignaturas
  router.get('/subjects/:id', subjectController.getSubjectById) // obtener una asignatura dado un id
  router.get('/subjects/user/active', subjectController.getUserSubjects) // obtener las asignaturas de un usuario
  router.post('/subjects', subjectController.createSubject) // crear una asignatura
  router.put('/subjects/:id', subjectController.updateSubject) // actualizar una asignatura dado un id
  router.delete('/subjects/:id', subjectController.deleteSubject) // eliminar una asignatura dado un id

  // Métodos de tareas
  router.get('/taks/:id', taskController.getTaskId) // obtener una tarea dado un id
  router.get('/tasks/subject/:id', taskController.getTasks) // obtener las tareas de una asignatura
  router.get('/tasks/user/active', taskController.getUserTasks) // obtener las tareas de un usuario
  router.get('/tasks/done/user', taskController.getDoneTasks) // obtener las tareas completadas de un usuario
  router.post('/tasks', taskController.createTask) // crear una tarea
  router.put('/tasks/:id', taskController.updateTask) // actualizar una tarea dado un id
  router.delete('/tasks/:id', taskController.deleteTask) // eliminar una tarea dado un id
  router.put('/tasks/mark/done/:id', taskController.markTaskAsDone) // marcar una tarea como completada
  router.put('/tasks/roll/back/:id', taskController.rollBackTask) // desmarcar una tarea como completada

  // Métodos de tipo
  router.get('/topics/:id', topicController.getTopicById) // obtener un tipo dado un id
  router.get('/topics/user/active', topicController.getUsertopics) // obtener los tipos de un usuario
  router.post('/topics', topicController.createTopic) // crear un tipo
  router.put('/topics/:id', topicController.updateTopic) // actualizar un tipo dado un id
  router.delete('/topics/:id', topicController.deleteTopic) // eliminar

  // ruta de image
  router.post('/image/cloudinary', upload.single('image'), imageController.uploadImage) // subir una imagen a cloudinary

  // ruta de login
  router.post('/login', loginController.login) // iniciar sesion
  router.post('/logout', loginController.logout) // cerrar sesion

  return router
}

// hola cris _v

/*
  Export= permite exportar varias clases o metodos con el fin de que pueda ser importado en otro archivo
  Export default = permite exportar un clase o metodo por defecto, es decir, que no necesita ser importado con el mismo nombre
  Solo se puede exportar uni

*/
