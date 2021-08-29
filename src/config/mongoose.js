// https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options

import { connect } from 'mongoose'
import { MONGODB_URI } from './'

;(async () => {
  try {
    const db = await connect(MONGODB_URI)
    console.log(`Database connected to ${db.connection.name}`)
  } catch (e) { console.error(`[Error] ${e}`) }
})()
