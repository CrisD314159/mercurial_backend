import postgres from 'postgres'
// process.loadEnvFile() // con esto cargamos las variables de entorno sin necesidad de usar dotenv
import 'dotenv/config'

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env

export const sql = postgres({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${process.env.ENDPOINT_ID}`
  }
})
