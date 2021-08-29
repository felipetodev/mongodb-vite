import { config } from 'dotenv'
config()

export const {
  MONGODB_URI = '',
  PORT = '3000',
  JWT_SECRET = ''
} = process.env
