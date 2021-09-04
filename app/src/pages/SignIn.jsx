import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Container, Text } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { useAuth } from '../context/providers/AuthContext'

const INITIAL_LOGIN_STATE = {
  email: '',
  password: ''
}

export default function SignIn () {
  const [userLogin, setUserLogin] = useState(INITIAL_LOGIN_STATE)
  const { signIn, user, isLoading: request, isLoggedIn } = useAuth()

  const handleOnChange = ({ target }) => {
    setUserLogin({
      ...userLogin,
      [target.name]: target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn(userLogin)
  }

  return (
    <Container maxWidth='container.xl'>
      <Text as='h1' fontSize='xx-large'>
        Login
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
            ? 'Log In'
            : `Welcome back ${user.email}!`}
        </Button>
      </FormControl>
    </Container>
  )
}
