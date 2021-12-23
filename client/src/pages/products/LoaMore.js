import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'
import './styles.css'

export default function LoaMore () {
  const state = useContext(GlobalState)
  const [page, setPage] = state.ProductsAPI.page
  const [result] = state.ProductsAPI.result

  return (
    <div className='load_more'>
      {result < page * 9 ? (
        ''
      ) : (
        <button onClick={() => setPage(page + 1)}>Load More</button>
      )}
    </div>
  )
}
