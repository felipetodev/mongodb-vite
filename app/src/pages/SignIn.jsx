import React, { useState } from 'react'
import { useAuth } from '../context'
import { Link as ReachLink } from 'react-router-dom'
import { FormControl, FormLabel, Link, Button, Input, Text } from '@chakra-ui/react'

const INITIAL_LOGIN_STATE = {
  email: '',
  password: ''
}

export default function SignIn () {
  const [userLogin, setUserLogin] = useState(INITIAL_LOGIN_STATE)
  const { signIn, user, isLoading: request } = useAuth()

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
    <>
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
          Send
        </Button>
        <Text>Don't have an account? {' '}
          <Link as={ReachLink} to='/auth/sign-up' color='teal.300'>Sign Up</Link>
        </Text>
      </FormControl>
    </>
  )
}
