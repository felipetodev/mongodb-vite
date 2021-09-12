import React, { useState } from 'react'
import { useProducts } from '../context'
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
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
import noImageInput from '../assets/no-image.png'

const INITIAL_FORM_STATE = {
  name: '',
  price: 0,
  stock: 0,
  description: ''
}

const parseImageUpload = (image) => {
  const binaryData = []
  binaryData.push(image)
  const blob = new window.Blob(binaryData, { type: 'application/zip' })
  return window.URL.createObjectURL(blob)
}

export default function ProductForm () {
  const { addNewProduct, isLoading: request } = useProducts()
  const [productInput, setProductInput] = useState(INITIAL_FORM_STATE)
  const [fileInput, setFileInput] = useState('')

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
    const formData = new window.FormData()

    formData.append('name', productInput.name)
    formData.append('price', productInput.price)
    formData.append('stock', productInput.stock)
    formData.append('description', productInput.description)
    formData.append('image', fileInput)

    addNewProduct(formData)
  }

  return (
    <>
      <Text as='h1' fontSize='xx-large'>
        Add new product
      </Text>
      <FormControl as='form' paddingY={6} onSubmit={handleSubmit}>
        <FormLabel>Product Name</FormLabel>
        <Input onChange={handleOnChange} id='name' type='text' name='name' placeholder='Name...' />

        <FormLabel>Price</FormLabel>
        <Input onChange={handleOnChange} id='price' type='number' name='price' placeholder='Example: $20.00' />

        <FormLabel>Stock Quantity</FormLabel>
        <NumberInput max={50} min={0} onChange={(value) => setProductInput({ ...productInput, stock: Number(value) })}>
          <NumberInputField placeholder='Product stock quantity...' />
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
        <Center>
          <Image
            src={fileInput
              ? parseImageUpload(fileInput)
              : noImageInput}
            alt='upload-image'
            objectFit='contain'
            h={60}
            w={60}
          />
          <Stack paddingLeft={2}>
            <FormLabel id='image'>Image:</FormLabel>
            <Input
              onChange={({ target }) => setFileInput(target.files[0])}
              p={1}
              id='image'
              name='image'
              type='file'
              cursor='pointer'
            />
          </Stack>
        </Center>
      </FormControl>
    </>
  )
}
