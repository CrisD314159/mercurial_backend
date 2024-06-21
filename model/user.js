import { sql } from './utils/bdConnection.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { statesUser } from './utils/states.js'
import EmailService from './utils/emailService.js'
export class User {
  static async getUser (id) {
    const result = await sql`select id, name, email, username, image from usuario where id = ${id} and state = ${statesUser.active}`
    if (!result[0]) return false
    if (result[0].state === statesUser.unverified) throw new Error('You must verify your account first to continue')

    return result[0] // retornamos el usuario
  }

  static async getUserPass (id) {
    const result = await sql`select * from usuario where id = ${id} and state = ${statesUser.active}`
    if (!result[0]) return false
    if (result[0].state === statesUser.unverified) throw new Error('You must verify your account first to continue')

    return result[0] // retornamos el usuario
  }

  static async getUserNotVerified (id) {
    const result = await sql`select * from usuario where id = ${id} and state = ${statesUser.unverified}`
    if (!result[0]) return false
    if (result[0].state === statesUser.active) throw new Error('Your account is already verified')

    return result[0] // retornamos el usuario
  }

  static async getUserByEmailUsername (username, email) {
    // Verificamos si el usuario o el email ya existen en la base de datos, para no permitir duplicados
    const result = await sql`select * from usuario where username = ${username} or email = ${email}`
    if (result[0]) return true

    return false
  }

  static async getUserByEmail (email) {
    const result = await sql`select * from usuario where email = ${email} and state = ${statesUser.active}`
    if (result[0]) return result[0]

    return false
  }

  // luego implementaremos el servicio de imagenes para que nos devuelva la url de la imagen

  // Me toco añadir dos columnas en la tabla de usuario, una para el estado del usuario y otra para la url de la imagen
  // por consecuencia, también tuve que añadir una tabla para administrar el estado del usuario
  /**
     * para añadir una columna a una base de datos usamos
     * alter table nombre_tbala
     *  add nombre_columna tipo_dato
     *
     * Si quieres añadir una llave foranea a una columna que ya esta creada, usamos
     * alter table nombre_tabla
     *  add constraint nombre_constraint foreign key(nombre_columna) references nombre_tabla(nombre_columna)
     *
     * Estos fueron los comandos que usé para añadir las columnas
     */

  static async createUser (input) {
    const { name, email, username, password, image } = input
    const id = crypto.randomUUID()
    const exists = await this.getUserByEmailUsername(username, email)
    if (!exists) {
      const hashedPassword = await bcrypt.hash(password, 10) // hasheamos la contraseña mediante bcrypt, esto permite que la contraseña no se almacene en texto plano
      try {
        if (image) {
          await sql`insert into usuario (id, name, email, username, password, image, state) values (${id}, ${name}, ${email}, ${username}, ${hashedPassword}, ${image}, ${statesUser.unverified} )`
        } else {
          await sql`insert into usuario (id, name, email, username, password, state) values (${id}, ${name}, ${email}, ${username}, ${hashedPassword}, ${statesUser.unverified} )`
        }
        await EmailService.sendEmailVerify({ email, id })
        // if (!emailResponse) throw new Error('Error sending email')
        return true
      } catch (e) {
        return false
      }
    } else {
      throw new Error('User already exists')
    }
  }

  // Actualizar un usuario dado un id
  static async updateUser (id, input) {
    const { name, username, password, image } = input
    const exists = await this.getUser(id)
    if (!exists) {
      throw new Error('User does not exists')
    }
    try {
      // Lo que vamos a hacer en este caso es una transacción
      // Las transacciones nos permiten ejecutar varias consultas SQL en una sola transacción, si alguna de las consultas falla, se hace un rollback y se deshacen los cambios
      // en caso de que todas las consultas sean exitosas, se hace un commit y se guardan los cambios
      const response = await sql.begin(async (sql) => { // para iniciar una transacción, usamos el método begin de la connexion a la base de datos
        if (name) {
          await sql`update usuario set name = ${name} where id = ${id}`
        }
        if (username) {
          await sql`update usuario set username = ${username} where id = ${id}`
        }
        if (password) {
          const hashedPassword = await bcrypt.hash(password, 10) // hasheamos la contraseña mediante bcrypt, esto permite que la contraseña no se almacene en texto plano
          await sql`update usuario set password = ${hashedPassword} where id = ${id}`
        }
        if (image) {
          await sql`update usuario set image = ${image} where id = ${id}`
        }
        return true // si todo sale bien, retornamos true
        // En caso de que exista un error, lo arrojará y además en la base de datos se producira un rollback y se desharán los cambios
      })

      return response // retornamos la respuesta de la transacción
    } catch (e) {
      return false
    }
  }

  // Eliminar un usuario dado un id
  static async deleteUser (id) {
    const exists = await this.getUser(id)
    if (!exists) {
      throw new Error('User does not exists')
    }
    try {
      // Como para la aplicaion estamos usando borrado logico, lo que haremos es cambiar el estado del usuario a inactivo no borrarlo por completo
      await sql`update usuario set state = ${statesUser.inactive} where id = ${id}`
      return true
    } catch (e) {
      return false
    }
  }

  static async changePassword (id, input) {
    const { email, password } = input
    const exists = await this.getUser(id)
    if (!exists) {
      throw new Error('User does not exists')
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10) // hasheamos la contraseña mediante bcrypt, esto permite que la contraseña no se almacene en texto plano
      await sql`update usuario set password = ${hashedPassword} where id = ${id} and email = ${email}`
      await EmailService.passwordChangeConfirmation({ email })
      return true
    } catch (e) {
      return false
    }
  }

  static async sendEmailChangePassword (input) {
    const { email } = input
    const exists = await this.getUserByEmailUsername(null, email)
    if (!exists) {
      throw new Error('User does not exists')
    }
    try {
      const user = await EmailService.sendEmailResetPassword({ email })
      return user
    } catch (e) {
      return false
    }
  }

  // este metodo los usaremos mas adelante para verificar un usuario una vez presione el link de verificación que le llega al correo
  static async verifyUser (id) {
    const exists = await this.getUserNotVerified(id)
    if (!exists) {
      throw new Error('User does not exists')
    }
    try {
      await sql`update usuario set state = ${statesUser.active} where id = ${id}`
      return true
    } catch (e) {
      return false
    }
  }
}
