import axios from 'axios'

const { VITE_API: API = '' } = import.meta.env

// productsApi
export const getProducts = async () => await axios.get(`${API}/products`)

const axios2 = axios.create({
  baseURL: `${API}/products`
})

axios2.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`

  return config
}, (error) => {
  return Promise.reject(error)
})

export const saveProduct = async (newProduct = {}) => await axios2.post(`${API}/products`, newProduct)

// authApi
export const register = async (user) => await axios.post(`${API}/auth/register`, user)
export const login = async (user) => await axios.post(`${API}/auth/login`, user)
export const profile = async (token) => await axios.get(`${API}/auth/profile`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const deleteProduct = async (productId) => await axios2.delete(`${API}/products/${productId}`)
export const updateProduct = async (productId) => await axios2.put(`${API}/products/${productId}`)
