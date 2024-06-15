import { Router } from 'express'
import MercurialControllerUser from '../controller/userController'
import MercurialControllerSubject from '../controller/subjectController'
import MercurialControllerTask from '../controller/taskController'
import MercurialControllerTopic from '../controller/topicController'

export default function Routes ({ model }) {
  const router = Router()
  const userController = new MercurialControllerUser({ model })
  const subjectController = new MercurialControllerSubject({ model })
  const taskController = new MercurialControllerTask({ model })
  const topicController = new MercurialControllerTopic({ model })

  // Métodos de usuario
  router.get('/users/:id', userController.getUser) // obtener un usuario dado un id
  router.post('/users', userController.createUser) // crear un usuario
  router.put('/users/:id', userController.updateUser) // actualizar un usuario dado un id
  router.delete('/users/:id', userController.deleteUser)

  // Metodos de asignaturas
  router.get('/subjects/:id', subjectController.getSubjectById) // obtener una asignatura dado un id
  router.get('/subjects/user/:id', subjectController.getUserSubjects)
  router.post('/subjects', subjectController.createSubject)
  router.put('/subjects/:id', subjectController.updateSubject)
  router.delete('/subjects/:id', subjectController.deleteSubject)

  // Métodos de tareas
  router.get('/taks/:id', taskController.getTaskId)
  router.get('tasks/suject/:id', taskController.getUserTasks)
  router.post('/tasks', taskController.createTask)
  router.put('/tasks/:id', taskController.updateTask)
  router.delete('/tasks/:id', taskController.deleteTask)

  // Métodos de tipo
  router.get('/topics/:id', topicController.getTopicId)
  router.get('/topics/user/:id', topicController.getUsertopics)
  router.post('/topics', topicController.createTopic)
  router.put('/topics/:id', topicController.updateTopic)
  router.delete('/topics/:id', topicController.deleteTopic)

  return router
}

// hola cris _v

/*
  Export= permite exportar varias clases o metodos con el fin de que pueda ser importado en otro archivo
  Export default = permite exportar un clase o metodo por defecto, es decir, que no necesita ser importado con el mismo nombre
  Solo se puede exportar uni

*/
