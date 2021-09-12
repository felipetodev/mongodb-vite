import React from 'react'
import Home from './pages'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ProductForm from './pages/ProductForm'
import Navbar from './components/Navbar'
import { AuthProvider, CartProvider, ProductProvider } from './context'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from '@chakra-ui/layout'

function App () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            <Container maxWidth='container.xl'>
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/auth/sign-up' exact component={SignUp} />
                <Route path='/auth/sign-in' exact component={SignIn} />
                <Route path='/products/new' exact component={ProductForm} />
              </Switch>
            </Container>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
