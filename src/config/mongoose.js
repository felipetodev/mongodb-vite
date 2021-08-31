// https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options

import { connect, connection } from 'mongoose'
import { MONGODB_URI } from './'

;(async () => {
  try {
    const db = await connect(MONGODB_URI)
    console.log(`Database connected to ${db.connection.name}`)
  } catch (e) { console.error(`[Error] ${e}`) }
})()

connection.on('connected', () => {
  console.log('MongoDB is connected')
})

connection.on('error', (error) => {
  console.error(error)
})

connection.on('disconnected', () => {
  console.log('MongoDB is disconnected')
})

process.on('SIGINT', async () => {
  await connection.close()
  process.exit(0)
})
