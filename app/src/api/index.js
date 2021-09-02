import axios from 'axios'

const { VITE_API: API = '' } = import.meta.env

// productsApi
export const getProducts = async () => await axios.get(`${API}/products`)
export const saveProduct = async (newProduct = {}) => await axios.post(`${API}/products`, newProduct)

// authApi
export const register = async (user) => await axios.post(`${API}/auth/register`, user)
export const login = async (user) => await axios.post(`${API}/auth/login`, user)
export const profile = async (token) => await axios.get(`${API}/auth/profile`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
