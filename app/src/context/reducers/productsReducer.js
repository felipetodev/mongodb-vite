import { productsActions } from '../actions/productsActions'

export const initialState = {
  products: [],
  currentProduct: {},
  isLoading: false,
  errorMessage: ''
}

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productsActions.LOAD_PRODUCTS:
      return {
        ...state,
        isLoading: true
      }
    case productsActions.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoading: false
      }
    case productsActions.LOAD_PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: `Something went wrong [${action.payload}]`
      }
    case productsActions.LOAD_SAVE_PRODUCT:
      return {
        ...state,
        isLoading: true
      }
    case productsActions.LOAD_SAVE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: state.products.concat(action.payload)
      }
    case productsActions.LOAD_SAVE_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: `Something went wrong [${action.payload}]`
      }

    default:
      return state
  }
}
