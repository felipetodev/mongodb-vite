import { cartActions } from '../actions/cartActions'

export const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
}

export const initializerCart = (initialState) => {
  const cartFromStorage = window.localStorage.getItem('cart')
  return JSON.parse(cartFromStorage) || initialState
}

const getTotalPrice = (items) => items.reduce((total, { product, quantity }) =>
  total + product.price * quantity, 0)

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action
  const { items, totalItems, totalPrice } = state
  switch (type) {
    case cartActions.APPEND_ITEM_TO_CART: {
      const newItems = items.find(item => item.product.id === payload.product.id)
        ? items.map(item => item.product === payload.product
            ? { ...item, quantity: item.quantity + 1 }
            : item)
        : [...items, { ...payload, quantity: 1 }]

      return {
        ...state,
        items: newItems,
        totalItems: totalItems + 1,
        totalPrice: getTotalPrice(newItems)
      }
    }
    case cartActions.DECREMENT_ITEM_TO_CART: {
      const newItems = items.find(it => it.product.id === payload.product.id).quantity === 1
        ? items.filter(item => item.product !== payload.product)
        : items.map(it => it.product.id === payload.product.id
          ? { ...it, quantity: it.quantity - 1 }
          : it)

      return {
        ...state,
        items: newItems,
        totalItems: totalItems - 1,
        totalPrice: getTotalPrice(newItems)
      }
    }
    case cartActions.REMOVE_ITEM_TO_CART:
      return {
        ...state,
        items: items.filter(({ product }) => product.id !== payload.product.id),
        totalItems: (totalItems - payload.quantity),
        totalPrice: totalPrice - (payload.product.price * payload.quantity)
      }
    case cartActions.CART_DESTROY:
      return initialState
    default:
      return state
  }
}
