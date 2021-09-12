import createError from 'http-errors'
import Product from '../models/Product'

export const getProducts = async (req, res) => {
  const products = await Product.find({})

  res.json(products)
}

export const createProduct = async (req, res, next) => {
  const { name, price, description, stock } = req.body
  try {
    const productDuplicated = await Product.findOne({ name })

    if (productDuplicated) throw createError.Conflict(`Product "${name}" already exists`)

    const newProduct = new Product({
      name,
      price,
      description,
      stock
    })

    await newProduct.save()
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = (req, res) => {
  res.json('updating products')
}

export const getProduct = (req, res) => {
  res.json('get product')
}

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (deletedProduct) return res.sendStatus(204)
    return res.sendStatus(404)
  } catch (error) {
    next(error)
  }
}
