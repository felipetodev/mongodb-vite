import React, { createContext, useContext, useReducer } from 'react'
import { register, profile } from '../../api'
import { authActions } from '../actions/authActions'
import { initialState, authReducer } from '../reducers/authReducer'

export const AuthContext = createContext(initialState)

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const signup = async (newUser) => {
    dispatch({
      type: authActions.AUTH_SIGN_UP
    })
    try {
      const { data = {} } = await register(newUser)
      const { token = '' } = data

      let user = null
      if (token) {
        const { data = {} } = await profile(token)
        user = await data
      }

      dispatch({
        type: authActions.AUTH_SIGN_UP_SUCCESS,
        payload: {
          token,
          user
        }
      })
    } catch (error) {
      const { response } = error
      dispatch({
        type: authActions.AUTH_SIGN_UP_FAIL,
        payload: response.data.message || error
      })
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, signup }}>
      {children}
    </AuthContext.Provider>
  )
}
