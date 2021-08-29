import React from 'react'
import Home from './pages'
import ProductForm from './pages/ProductForm'
import { ProductProvider } from './context/providers/ProductsContext'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App () {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/products/new' exact component={ProductForm} />
        </Switch>
      </ProductProvider>
    </BrowserRouter>
  )
}

export default App
