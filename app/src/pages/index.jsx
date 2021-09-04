import React from 'react'
import { useProducts } from '../context/providers/ProductsContext'
import { Link } from 'react-router-dom'

export default function Home () {
  const { products, isLoading, errorMessage } = useProducts()
  if (isLoading) return <h1>Loading...</h1>
  if (errorMessage) return <h1>{errorMessage}</h1>

  return (
    <>
      <div style={{ fontWeight: 'bold' }}>
        <Link to='/products/new'>Add new product</Link>
      </div>
      <div style={{ fontWeight: 'bold' }}>
        <Link to='/auth/sign-up'>Register</Link>
      </div>
      <div style={{ fontWeight: 'bold' }}>
        <Link to='/auth/sign-in'>Login</Link>
      </div>
      {products &&
        products.map((product) => (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <span>{product.description}</span>
            <span>{product.price}</span>
          </div>
        ))}
    </>
  )
}
