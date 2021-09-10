import React from 'react'
import { Text, HStack } from '@chakra-ui/react'
import { useProducts } from '../context/providers/ProductsContext'

export default function Cart () {
  const { cart } = useProducts()
  return (
    <>
      <Text as='h1' fontWeight='bold'>Shopping Cart</Text>
      {cart &&
        cart.map(product => (
          <HStack key={product.id}>
            <Text>{product.name} -</Text>
            <Text>(${product.price}) -</Text>
            <Text>{product.description}</Text>
          </HStack>
        ))}
    </>
  )
}
