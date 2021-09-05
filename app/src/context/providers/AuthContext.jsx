import React, { createContext, useContext, useReducer } from 'react'
import { register, profile, login } from '../../api'
import { authActions } from '../actions/authActions'
import { initialState, authReducer } from '../reducers/authReducer'

export const AuthContext = createContext(initialState)

export const useAuth = () => {
  return useContext(AuthContext)
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
        window.localStorage.setItem('token', token)
        const { data = {} } = await profile(token)
        user = await data
      }

      if (user) window.localStorage.setItem('user', JSON.stringify(user))

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

  const signIn = async (userLogin = {}) => {
    dispatch({
      type: authActions.AUTH_SIGN_IN
    })
    try {
      const { data = {} } = await login(userLogin)
      const { token = '' } = data

      let user = null
      if (token) {
        window.localStorage.setItem('token', token)
        const { data = {} } = await profile(token)
        user = await data
      }

      if (user) window.localStorage.setItem('user', JSON.stringify(user))

      dispatch({
        type: authActions.AUTH_SIGN_IN_SUCCESS,
        payload: {
          token,
          user
        }
      })
    } catch (error) {
      const { response } = error
      dispatch({
        type: authActions.AUTH_SIGN_IN_FAIL,
        payload: response.data.message || error
      })
    }
  }

  const logOut = async () => {
    window.localStorage.clear()
    dispatch({
      type: authActions.AUTH_SESSION_DESTROY
    })
  }

  return (
    <AuthContext.Provider value={{ ...state, signup, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}
