import { Router } from 'express'
const cartRouter = Router()

cartRouter.get('/products')

cartRouter.post('/products')

cartRouter.get('/products/:id')

cartRouter.put('/products/:id')

cartRouter.delete('/products/:id')

export default cartRouter
