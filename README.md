# API Documentation

## Base URL
`http://localhost:8080/`

## User Methods

### Get User by ID
- **URL:** `http://localhost:8080/users/:id`
- **Method:** `GET`
- **Description:** Retrieves a user by ID.
- **Path Parameters:**
  - `id` (string): The ID of the user.

### Create User
- **URL:** `http://localhost:8080/users`
- **Method:** `POST`
- **Description:** Creates a new user.
- **Request Body:**
  - The new user data in JSON format.

### Update User
- **URL:** `http://localhost:8080/users`
- **Method:** `PUT`
- **Description:** Updates user data.
- **Request Body:**
  - The updated user data in JSON format.

### Delete User by ID
- **URL:** `http://localhost:8080/users/:id`
- **Method:** `DELETE`
- **Description:** Deletes a user by ID.
- **Path Parameters:**
  - `id` (string): The ID of the user.

### Change User Password
- **URL:** `http://localhost:8080/users/password/change`
- **Method:** `PUT`
- **Description:** Changes a user's password.
- **Request Body:**
  - The necessary data to change the password in JSON format.

### Send Email to Change Password
- **URL:** `http://localhost:8080/users/password/change/email`
- **Method:** `POST`
- **Description:** Sends an email to change the password.
- **Request Body:**
  - The necessary data to send the email in JSON format.

### Verify User by ID
- **URL:** `http://localhost:8080/users/account/verify/:id`
- **Method:** `PUT`
- **Description:** Verifies a user by ID.
- **Path Parameters:**
  - `id` (string): The ID of the user.

## Subject Methods

### Get Subject by ID
- **URL:** `http://localhost:8080/subjects/:id`
- **Method:** `GET`
- **Description:** Retrieves a subject by ID.
- **Path Parameters:**
  - `id` (string): The ID of the subject.

### Get User's Active Subjects
- **URL:** `http://localhost:8080/subjects/user/active`
- **Method:** `GET`
- **Description:** Retrieves a user's active subjects.

### Create Subject
- **URL:** `http://localhost:8080/subjects`
- **Method:** `POST`
- **Description:** Creates a new subject.
- **Request Body:**
  - The new subject data in JSON format.

### Update Subject by ID
- **URL:** `http://localhost:8080/subjects/:id`
- **Method:** `PUT`
- **Description:** Updates a subject by ID.
- **Path Parameters:**
  - `id` (string): The ID of the subject.
- **Request Body:**
  - The updated subject data in JSON format.

### Delete Subject by ID
- **URL:** `http://localhost:8080/subjects/:id`
- **Method:** `DELETE`
- **Description:** Deletes a subject by ID.
- **Path Parameters:**
  - `id` (string): The ID of the subject.

## Task Methods

### Get Task by ID
- **URL:** `http://localhost:8080/tasks/:id`
- **Method:** `GET`
- **Description:** Retrieves a task by ID.
- **Path Parameters:**
  - `id` (string): The ID of the task.

### Get Tasks by Subject ID
- **URL:** `http://localhost:8080/tasks/subject/:id`
- **Method:** `GET`
- **Description:** Retrieves tasks by subject ID.
- **Path Parameters:**
  - `id` (string): The ID of the subject.

### Get User's Active Tasks
- **URL:** `http://localhost:8080/tasks/user/active`
- **Method:** `GET`
- **Description:** Retrieves a user's active tasks.

### Get User's Completed Tasks
- **URL:** `http://localhost:8080/tasks/done/user`
- **Method:** `GET`
- **Description:** Retrieves a user's completed tasks.

### Create Task
- **URL:** `http://localhost:8080/tasks`
- **Method:** `POST`
- **Description:** Creates a new task.
- **Request Body:**
  - The new task data in JSON format.

### Update Task by ID
- **URL:** `http://localhost:8080/tasks/:id`
- **Method:** `PUT`
- **Description:** Updates a task by ID.
- **Path Parameters:**
  - `id` (string): The ID of the task.
- **Request Body:**
  - The updated task data in JSON format.

### Delete Task by ID
- **URL:** `http://localhost:8080/tasks/:id`
- **Method:** `DELETE`
- **Description:** Deletes a task by ID.
- **Path Parameters:**
  - `id` (string): The ID of the task.

### Mark Task as Done
- **URL:** `http://localhost:8080/tasks/mark/done/:id`
- **Method:** `PUT`
- **Description:** Marks a task as done.
- **Path Parameters:**
  - `id` (string): The ID of the task.

### Roll Back Task
- **URL:** `http://localhost:8080/tasks/roll/back/:id`
- **Method:** `PUT`
- **Description:** Rolls back a task to not completed.
- **Path Parameters:**
  - `id` (string): The ID of the task.

## Topic Methods

### Get Topic by ID
- **URL:** `http://localhost:8080/topics/:id`
- **Method:** `GET`
- **Description:** Retrieves a topic by ID.
- **Path Parameters:**
  - `id` (string): The ID of the topic.

### Get User's Active Topics
- **URL:** `http://localhost:8080/topics/user/active`
- **Method:** `GET`
- **Description:** Retrieves a user's active topics.

### Create Topic
- **URL:** `http://localhost:8080/topics`
- **Method:** `POST`
- **Description:** Creates a new topic.
- **Request Body:**
  - The new topic data in JSON format.

### Update Topic by ID
- **URL:** `http://localhost:8080/topics/:id`
- **Method:** `PUT`
- **Description:** Updates a topic by ID.
- **Path Parameters:**
  - `id` (string): The ID of the topic.
- **Request Body:**
  - The updated topic data in JSON format.

### Delete Topic by ID
- **URL:** `http://localhost:8080/topics/:id`
- **Method:** `DELETE`
- **Description:** Deletes a topic by ID.
- **Path Parameters:**
  - `id` (string): The ID of the topic.


## Authentication Methods

### Login
- **URL:** `http://localhost:8080/login`
- **Method:** `POST`
- **Description:** Logs in to the application.
- **Request Body:**
  - The user credentials in JSON format.

### Logout
- **URL:** `http://localhost:8080/logout`
- **Method:** `POST`
- **Description:** Logs out of the application.