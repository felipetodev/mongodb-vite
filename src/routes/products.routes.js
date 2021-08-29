import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct
} from '../controllers/product.controller'
const productsRouter = Router()

productsRouter.get('/products', getProducts)
productsRouter.post('/products', createProduct)
productsRouter.get('/products/:id', getProduct)
productsRouter.put('/products/:id', updateProduct)
productsRouter.delete('products/:id', deleteProduct)

export default productsRouter
