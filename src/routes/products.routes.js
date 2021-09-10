import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct
} from '../controllers/product.controller'
import { userExtractor } from '../middlewares/userExtractor'
const productsRouter = Router()

productsRouter.get('/products', getProducts)
productsRouter.post('/products', userExtractor, createProduct)
productsRouter.get('/products/:id', getProduct)
productsRouter.put('/products/:id', userExtractor, updateProduct)
productsRouter.delete('/products/:id', userExtractor, deleteProduct)

export default productsRouter
