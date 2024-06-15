import { Router } from 'express'
import MercurialControllerUser from '../controller/userController'
import MercurialControllerSubject from '../controller/subjectController'

export default function Routes ({ model }) {
  const router = Router()
  const userController = new MercurialControllerUser({ model })
  const subjectController = new MercurialControllerSubject({ model })

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
  router.get('/taks/:id',)
  router.get('tasks/suject/:id',)
  router.post('/tasks',)
  router.put('/tasks/:id',)
  router.delete('/tasks/:id',)

  // Métodos de tipo
  router.get('/topics/:id',)
  router.get('/topics/user/:id',)
  router.post('/topics',)
  router.put('/topics/:id',)
  router.delete('/topics/:id',)

  return router
}

/*
  Export= permite exportar varias clases o metodos con el fin de que pueda ser importado en otro archivo
  Export default = permite exportar un clase o metodo por defecto, es decir, que no necesita ser importado con el mismo nombre
  Solo se puede exportar uni

*/
