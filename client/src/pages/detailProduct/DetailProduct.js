import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import ProductItem from '../../util/productItem/ProductItem'
import './styles.css'

export default function DetailProduct () {
  const params = useParams()
  const state = useContext(GlobalState)
  const [products] = state.ProductsAPI.products
  const addCart = state.UserAPI.addCart
  const [detailProduct, setDetailProduct] = useState([])

  useEffect(() => {
    if (params.id) {
      products.forEach(product => {
        if (product._id === params.id) setDetailProduct(product)
      })
    }
  }, [params.id, products])

  if (detailProduct.length === 0) return null

  console.log(detailProduct)
  return (
    <>
      <div className='detail'>
        <img src={detailProduct.images.url} alt='' />
        <div className='box-detail'>
          <div className='row'>
            <h2>{detailProduct.title}</h2>
            <h2>#id: {detailProduct.product_id}</h2>
          </div>
          <span>${detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link
            to='/cart'
            className='cart'
            onClick={() => addCart(detailProduct)}
          >
            Buy Now
          </Link>
        </div>
      </div>

      <div className=''>
        <h2>REalted products</h2>
        <div className='products'>
          {products.map(product => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null
          })}
        </div>
      </div>
    </>
  )
}
