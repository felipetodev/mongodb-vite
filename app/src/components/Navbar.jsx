import React from 'react'
import Cart from '../pages/Cart'
import { Flex, Box, Heading, Spacer, Button, Link } from '@chakra-ui/react'
import { Link as LinkReach } from 'react-router-dom'
import { useAuth } from '../context'

export default function Navbar () {
  const { logOut, isLoggedIn } = useAuth()

  return (
    <Flex paddingY={2} paddingX={4} backgroundColor='teal.100'>
      <Box alignSelf='center'>
        <Link as={LinkReach} to='/'>
          <Heading size='md' color='teal.500'>FelipeToShop</Heading>
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Link as={LinkReach} to='/products/new'>
          <Button colorScheme='teal' mr='4'>
            + Products
          </Button>
        </Link>
        {!isLoggedIn && (
          <Link as={LinkReach} to='/auth/sign-up'>
            <Button colorScheme='teal' mr='4'>
              Sign Up
            </Button>
          </Link>
        )}
        {isLoggedIn
          ? <Button colorScheme='teal' onClick={logOut} mr='4'>Logout</Button>
          : (
            <Link as={LinkReach} to='/auth/sign-in'>
              <Button colorScheme='teal' mr='4'>Log in</Button>
            </Link>
            )}
        <Cart />
      </Box>
    </Flex>
  )
}
