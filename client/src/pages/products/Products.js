import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import Loading from '../../util/loading/Loading'
import ProductItem from '../../util/productItem/ProductItem'
import axios from 'axios'

import './styles.css'
import Filters from './Filters'
import LoaMore from './LoaMore'

export default function Products () {
  const state = useContext(GlobalState)
  const [products, setProduct] = state.ProductsAPI.products
  const [isAdmin] = state.UserAPI.isAdmin
  const [token] = state.token
  const [callback, setCallback] = state.ProductsAPI.callback
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)

  const handleCheck = async id => {
    console.log(id)
    products.forEach(product => {
      if (product._id === id) product.checked = !product.checked
    })

    setProduct([...products])
  }

  const deleteProduct = async (id, public_id) => {
    console.log({ id, public_id })
    try {
      setLoading(true)
      const destroyImg = axios.post(
        '/api/destroy',
        { public_id },
        {
          headers: { Authorization: token }
        }
      )
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token }
      })

      await destroyImg
      await deleteProduct
      setCallback(!callback)
      setLoading(false)
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  const checkAll = () => {
    products.forEach(product => {
      product.checked = !isCheck
    })
    setProduct([...products])
    setIsCheck(!isCheck)
  }

  const deleteAll = async () => {
    products.forEach(product => {
      if (product.checked) deleteProduct(product._id, product.images.public_id)
    })
  }

  if (loading) return <Loading />

  return (
    <>
      <Filters />
      {isAdmin && (
        <div className='delete-all'>
          <span>Seect all</span>
          <input type='checkbox' checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}
      <div className='products'>
        {products.map(product => (
          <ProductItem
            key={product._id}
            product={product}
            isAdmin={isAdmin}
            deleteProduct={deleteProduct}
            handleCheck={handleCheck}
          />
        ))}
      </div>
      <LoaMore />
      {products.length === 0 && <Loading />}
    </>
  )
}
