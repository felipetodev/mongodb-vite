import React, { useEffect, createContext, useContext, useReducer } from 'react'
import { cartActions } from '../actions/cartActions'
import { cartReducer, initializerCart, initialState } from '../reducers/cartReducer'

export const CartContext = createContext(initialState)

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, initializerCart)

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  const appendItemToCart = (item) => {
    dispatch({
      type: cartActions.APPEND_ITEM_TO_CART,
      payload: item
    })
  }

  const onRemoveItem = (item) => {
    dispatch({
      type: cartActions.REMOVE_ITEM_TO_CART,
      payload: item
    })
  }

  const onClearCart = () => dispatch({
    type: cartActions.CART_DESTROY
  })

  const onDecrementItem = (item) => dispatch({
    type: cartActions.DECREMENT_ITEM_TO_CART,
    payload: item
  })

  return (
    <CartContext.Provider value={{ ...state, appendItemToCart, onRemoveItem, onClearCart, onDecrementItem }}>
      {children}
    </CartContext.Provider>
  )
}
