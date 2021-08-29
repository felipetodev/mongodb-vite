import express from 'express'
import './config/mongoose'
import cors from 'cors'
import productsRouter from './routes/products.routes'
import authRouter from './routes/auth.routes'
import { PORT } from './config'

const app = express()
app.use(cors())
app.use(express.json())

app.use(productsRouter)
app.use(authRouter)

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`)
})
