import express from 'express'
import './config/mongoose'
import cors from 'cors'
import productsRouter from './routes/products.routes'
import authRouter from './routes/auth.routes'
import morgan from 'morgan'
import { PORT } from './config'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(productsRouter)
app.use(authRouter)

app.use((err, req, res, next) => {
  const error = {
    status: err.status || 500,
    message: err.message
  }
  res.status(error.status).json(error)
})

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`)
})
