import { config } from 'dotenv'
config()

export const {
  MONGODB_URI = '',
  PORT = '3000',
  JWT_SECRET = '',
  CLOUDINARY_API_KEY = '',
  CLOUDINARY_API_SECRET = '',
  CLOUDINARY_CLOUD_NAME = ''
} = process.env
