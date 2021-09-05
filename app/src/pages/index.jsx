import React from 'react'
import { useProducts } from '../context/providers/ProductsContext'
import { Text, Stack, Grid, Button, Image, Spacer } from '@chakra-ui/react'

export default function Home () {
  const { products, isLoading, errorMessage } = useProducts()

  const handleClick = () => {}

  if (isLoading) return <h1>Loading...</h1>
  if (errorMessage) return <h1>{errorMessage}</h1>

  return (
    <>
      <Grid
        marginY={8}
        padding={3}
        gridGap={6}
        templateColumns='repeat(auto-fill, minmax(250px, 1fr))'
      >
        {products &&
        products.map((product) => (
          <Stack
            key={product.id}
            justifyContent='space-between'
            spacing={1}
            borderRadius='md'
            padding={2}
            backgroundColor='gray.100'
            position='relative'
          >
            <Text
              fontSize={13}
              h='fit-content'
              color='white'
              borderRadius='md'
              p={1}
              fontWeight='bold'
              backgroundColor='teal.400'
              position='absolute'
              top={1}
              left={1}
            >
              ${product.price}
            </Text>
            <Stack display='flex' direction='row'>
              <Image width={24} height={24} src='https://via.placeholder.com/120x120' />
              <Stack>
                <Text fontWeight='bold' color='teal'>{product.name}</Text>
                <Text fontSize={12}>{product.description}</Text>
              </Stack>
            </Stack>
            <Spacer />
            <Button onClick={handleClick} colorScheme='teal'>Buy</Button>
          </Stack>
        ))}
      </Grid>
    </>
  )
}
