import { authActions } from '../actions/authActions'

export const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  errorMessage: '',
  isLoading: false
}

export const authReducer = (state, action) => {
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
        isLoggedIn: true
      }
    case authActions.AUTH_SIGN_UP_FAIL:
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
