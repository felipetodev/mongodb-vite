import React, { useState } from 'react'
import { useAuth } from '../context/providers/AuthContext'
import { Button, Container, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'

const INITIAL_REGISTER_STATE = {
  email: '',
  password: ''
}

export default function SignUp () {
  const [registerUser, setRegisterUser] = useState(INITIAL_REGISTER_STATE)
  const { signup, user, isLoggedIn, isLoading: request, errorMessage } = useAuth()

  const handleOnChange = ({ target }) => {
    setRegisterUser({
      ...registerUser,
      [target.name]: target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(registerUser)
  }
  return (
    <Container maxWidth='container.xl'>
      <Text as='h1' fontSize='xx-large'>
        Register
      </Text>
      <FormControl as='form' paddingY={6} onSubmit={handleSubmit}>
        <FormLabel>Email</FormLabel>
        <Input onChange={handleOnChange} id='email' type='email' name='email' placeholder='email address...' />

        <FormLabel>Password</FormLabel>
        <Input onChange={handleOnChange} id='password' type='password' name='password' placeholder='password...' />

        <Button
          mt={4}
          colorScheme='teal'
          isLoading={request}
          type='submit'
          disabled={user}
        >
          {!isLoggedIn
            ? 'Create Account'
            : `Welcome ${user.email}!`}
        </Button>
        {errorMessage && (
          <Text>
            {errorMessage}
          </Text>
        )}
      </FormControl>
    </Container>
  )
}
