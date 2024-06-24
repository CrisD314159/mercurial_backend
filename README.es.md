# API Documentation

## Base URL
`http://localhost:8080/`

## Métodos de Usuario

### Obtener un usuario por ID
- **URL:** `http://localhost:8080/users/:id`
- **Método:** `GET`
- **Descripción:** Obtiene un usuario dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID del usuario.

### Crear un usuario
- **URL:** `http://localhost:8080/users`
- **Método:** `POST`
- **Descripción:** Crea un nuevo usuario.
- **Cuerpo de la solicitud:**
  - Los datos del nuevo usuario en formato JSON.

### Actualizar un usuario
- **URL:** `http://localhost:8080/users`
- **Método:** `PUT`
- **Descripción:** Actualiza los datos de un usuario dado un ID.
- **Cuerpo de la solicitud:**
  - Los datos actualizados del usuario en formato JSON.

### Eliminar un usuario por ID
- **URL:** `http://localhost:8080/users/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina un usuario dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID del usuario.

### Cambiar la contraseña de un usuario
- **URL:** `http://localhost:8080/users/password/change`
- **Método:** `PUT`
- **Descripción:** Cambia la contraseña de un usuario.
- **Cuerpo de la solicitud:**
  - Los datos necesarios para cambiar la contraseña en formato JSON.

### Enviar un correo para cambiar la contraseña
- **URL:** `http://localhost:8080/users/password/change/email`
- **Método:** `POST`
- **Descripción:** Envía un correo electrónico para cambiar la contraseña.
- **Cuerpo de la solicitud:**
  - Los datos necesarios para enviar el correo en formato JSON.

### Verificar un usuario por ID
- **URL:** `http://localhost:8080/users/account/verify/:id`
- **Método:** `PUT`
- **Descripción:** Verifica un usuario dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID del usuario.

## Métodos de Asignaturas

### Obtener una asignatura por ID
- **URL:** `http://localhost:8080/subjects/:id`
- **Método:** `GET`
- **Descripción:** Obtiene una asignatura dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID de la asignatura.

### Obtener las asignaturas de un usuario
- **URL:** `http://localhost:8080/subjects/user/active`
- **Método:** `GET`
- **Descripción:** Obtiene las asignaturas activas de un usuario.

### Crear una asignatura
- **URL:** `http://localhost:8080/subjects`
- **Método:** `POST`
- **Descripción:** Crea una nueva asignatura.
- **Cuerpo de la solicitud:**
  - Los datos de la nueva asignatura en formato JSON.

### Actualizar una asignatura por ID
- **URL:** `http://localhost:8080/subjects/:id`
- **Método:** `PUT`
- **Descripción:** Actualiza los datos de una asignatura dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID de la asignatura.
- **Cuerpo de la solicitud:**
  - Los datos actualizados de la asignatura en formato JSON.

### Eliminar una asignatura por ID
- **URL:** `http://localhost:8080/subjects/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina una asignatura dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID de la asignatura.

## Métodos de Tareas

### Obtener una tarea por ID
- **URL:** `http://localhost:8080/tasks/:id`
- **Método:** `GET`
- **Descripción:** Obtiene una tarea dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID de la tarea.

### Obtener las tareas de una asignatura por ID
- **URL:** `http://localhost:8080/tasks/subject/:id`
- **Método:** `GET`
- **Descripción:** Obtiene las tareas de una asignatura dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID de la asignatura.

### Obtener las tareas activas de un usuario
- **URL:** `http://localhost:8080/tasks/user/active`
- **Método:** `GET`
- **Descripción:** Obtiene las tareas activas de un usuario.

### Obtener las tareas completadas de un usuario
- **URL:** `http://localhost:8080/tasks/done/user`
- **Método:** `GET`
- **Descripción:** Obtiene las tareas completadas de un usuario.

### Crear una tarea
- **URL:** `http://localhost:8080/tasks`
- **Método:** `POST`
- **Descripción:** Crea una nueva tarea.
- **Cuerpo de la solicitud:**
  - Los datos de la nueva tarea en formato JSON.

### Actualizar una tarea por ID
- **URL:** `http://localhost:8080/tasks/:id`
- **Método:** `PUT`
- **Descripción:** Actualiza los datos de una tarea dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID de la tarea.
- **Cuerpo de la solicitud:**
  - Los datos actualizados de la tarea en formato JSON.

### Eliminar una tarea por ID
- **URL:** `http://localhost:8080/tasks/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina una tarea dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID de la tarea.

### Marcar una tarea como completada
- **URL:** `http://localhost:8080/tasks/mark/done/:id`
- **Método:** `PUT`
- **Descripción:** Marca una tarea como completada.
- **Parámetros de ruta:**
  - `id` (string): El ID de la tarea.

### Desmarcar una tarea como completada
- **URL:** `http://localhost:8080/tasks/roll/back/:id`
- **Método:** `PUT`
- **Descripción:** Desmarca una tarea como completada.
- **Parámetros de ruta:**
  - `id` (string): El ID de la tarea.

## Métodos de Tipo

### Obtener un tipo por ID
- **URL:** `http://localhost:8080/topics/:id`
- **Método:** `GET`
- **Descripción:** Obtiene un tipo dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID del tipo.

### Obtener los tipos de un usuario
- **URL:** `http://localhost:8080/topics/user/active`
- **Método:** `GET`
- **Descripción:** Obtiene los tipos activos de un usuario.

### Crear un tipo
- **URL:** `http://localhost:8080/topics`
- **Método:** `POST`
- **Descripción:** Crea un nuevo tipo.
- **Cuerpo de la solicitud:**
  - Los datos del nuevo tipo en formato JSON.

### Actualizar un tipo por ID
- **URL:** `http://localhost:8080/topics/:id`
- **Método:** `PUT`
- **Descripción:** Actualiza los datos de un tipo dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID del tipo.
- **Cuerpo de la solicitud:**
  - Los datos actualizados del tipo en formato JSON.

### Eliminar un tipo por ID
- **URL:** `http://localhost:8080/topics/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina un tipo dado un ID.
- **Parámetros de ruta:**
  - `id` (string): El ID del tipo.

## Métodos de Autenticación

### Iniciar sesión
- **URL:** `http://localhost:8080/login`
- **Método:** `POST`
- **Descripción:** Inicia sesión en la aplicación.
- **Cuerpo de la solicitud:**
  - Las credenciales del usuario en formato JSON.

### Cerrar sesión
- **URL:** `http://localhost:8080/logout`
- **Método:** `POST`
- **Descripción:** Cierra sesión en la aplicación.