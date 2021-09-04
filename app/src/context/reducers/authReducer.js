import { authActions } from '../actions/authActions'

const tokenStorage = window.localStorage.getItem('token') ?? null
const userStorage = window.localStorage.getItem('user') ?? null

export const initialState = {
  isLoggedIn: !!tokenStorage,
  user: null || JSON.parse(userStorage),
  token: null || tokenStorage,
  errorMessage: '',
  isLoading: false
}

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case authActions.AUTH_SIGN_UP:
      return {
        ...state,
        isLoading: true
      }
    case authActions.AUTH_SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
        user: payload.user,
        errorMessage: ''
      }
    case authActions.AUTH_SIGN_UP_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: `Something went wrong: [${payload}]`
      }
    case authActions.AUTH_SIGN_IN:
      return {
        ...state,
        isLoading: true
      }
    case authActions.AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
        user: payload.user,
        errorMessage: ''
      }
    case authActions.AUTH_SIGN_IN_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: `Something went wrong: [${payload}]`
      }
    default:
      return {
        ...state
      }
  }
}
