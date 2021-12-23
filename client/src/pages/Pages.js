import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { GlobalState } from '../GlobalState'
import NoEncontrada from '../util/noEncontrada/NoEncontrada'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import DetailProduct from './detailProduct/DetailProduct'
import OrderDetails from './history/OrderDetails'
import OrderHIstory from './history/OrderHIstory'
import Products from './products/Products'

export default function Pages () {
  const state = useContext(GlobalState)
  const [isLogged] = state.UserAPI.isLogged
  const [isAdmin] = state.UserAPI.isAdmin

  return (
    <Routes>
      <Route path='/' exact element={<Products />} />
      <Route path='/detail/:id' exact element={<DetailProduct />} />
      <Route path='/login' exact element={ isLogged ? <NoEncontrada /> : <Login />} />
      <Route path='/register' exact element={ isLogged ? <NoEncontrada /> : <Register />} />
      <Route path='/history' exact element={isLogged ? <OrderHIstory /> : <NoEncontrada /> } />
      <Route path='/history/:id' exact element={isLogged ? <OrderDetails /> : <NoEncontrada /> } />
      <Route path='/category' exact element={isAdmin ? <Categories /> :<NoEncontrada />  } />
      <Route path='/create_product' exact element={isAdmin ? <CreateProduct /> :<NoEncontrada />  } />
      <Route path='/edit_product/:id' exact element={isAdmin ? <CreateProduct /> :<NoEncontrada />  } />
      <Route path='/cart' exact element={<Cart />} />
      <Route path='*' exact element={<NoEncontrada />} />
    </Routes>
  )
}
