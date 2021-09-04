import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { getProducts, saveProduct } from '../../api'
import { productsReducer, initialState } from '../reducers/productsReducer'
import { productsActions } from '../actions/productsActions'

export const ProductContext = createContext(initialState)

export const useProducts = () => {
  return useContext(ProductContext)
}

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState)
  const loadProducts = async () => {
    dispatch({
      type: productsActions.LOAD_PRODUCTS
    })

    try {
      const { data = [] } = await getProducts()
      dispatch({
        type: productsActions.LOAD_PRODUCTS_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: productsActions.LOAD_PRODUCTS_FAIL,
        payload: error
      })
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const addNewProduct = async (newProduct) => {
    dispatch({
      type: productsActions.LOAD_SAVE_PRODUCT
    })
    try {
      const { data = {} } = await saveProduct(newProduct)
      dispatch({
        type: productsActions.LOAD_SAVE_PRODUCT_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: productsActions.LOAD_SAVE_PRODUCT_FAIL,
        payload: error
      })
    }
  }

  return (
    <ProductContext.Provider value={{ ...state, addNewProduct }}>
      {children}
    </ProductContext.Provider>
  )
}
