import React from 'react'
import Home from './pages'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ProductForm from './pages/ProductForm'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import { AuthProvider } from './context/providers/AuthContext'
import { ProductProvider } from './context/providers/ProductsContext'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from '@chakra-ui/layout'

function App () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <Navbar />
          <Container maxWidth='container.xl'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/auth/sign-up' exact component={SignUp} />
              <Route path='/auth/sign-in' exact component={SignIn} />
              <Route path='/products/new' exact component={ProductForm} />
              <Route path='/cart' exact component={Cart} />
            </Switch>
          </Container>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
