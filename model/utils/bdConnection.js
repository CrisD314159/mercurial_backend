import postgres from 'postgres'

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env

export const sql = postgres({
  host: 'ep-old-sun-a480frai.us-east-1.aws.neon.tech',
  database: 'mercurial',
  username: 'starDB_owner',
  password: 'fd2UeI8ATwOR',
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${'ep-old-sun-a480frai'}`
  }
})
