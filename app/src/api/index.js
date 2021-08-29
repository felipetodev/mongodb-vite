import axios from 'axios'

const { VITE_API: API = '' } = import.meta.env

export const getProducts = async () => await axios.get(`${API}/products`)
export const saveProduct = async (newProduct = {}) => await axios.post(`${API}/products`, newProduct)
