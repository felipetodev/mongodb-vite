import React, { useState } from 'react'
import { useProducts } from '../context/providers/ProductsContext'
import {
  Text,
  Container,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  Image,
  Center,
  Button
} from '@chakra-ui/react'

const INITIAL_FORM_STATE = {
  name: '',
  price: 0,
  quantity: 0,
  description: ''
}

export default function ProductForm () {
  const { addNewProduct, isLoading: request } = useProducts()
  const [productInput, setProductInput] = useState(INITIAL_FORM_STATE)

  const handleOnChange = ({ target }) => {
    setProductInput({
      ...productInput,
      [target.name]: target.value,
      ...(target.name === 'price' && {
        price: Number(target.value)
      })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNewProduct(productInput)
  }

  return (
    <Container maxWidth='container.xl'>
      <Text as='h1' fontSize='xx-large'>
        Add new product
      </Text>
      <FormControl as='form' paddingY={6} onSubmit={handleSubmit}>
        <FormLabel>Product Name</FormLabel>
        <Input onChange={handleOnChange} id='name' type='text' name='name' placeholder='Name...' />

        <FormLabel>Price</FormLabel>
        <Input onChange={handleOnChange} id='price' type='number' name='price' placeholder='Example: $20.00' />

        <FormLabel>Quantity</FormLabel>
        <NumberInput max={50} min={0} onChange={(value) => setProductInput({ ...productInput, quantity: Number(value) })}>
          <NumberInputField placeholder='Product quantity...' />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <FormLabel>Product Description</FormLabel>
        <Textarea name='description' onChange={handleOnChange} placeholder='Description...' />

        <Button
          mt={4}
          colorScheme='teal'
          isLoading={request}
          type='submit'
        >
          Save
        </Button>
      </FormControl>

      <Center>
        <Image src='gibbresh.png' fallbackSrc='https://via.placeholder.com/150' />
      </Center>
    </Container>
  )
}
