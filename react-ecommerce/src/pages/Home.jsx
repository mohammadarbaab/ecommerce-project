import React from 'react'
import Navbar from '../features/navbar/Navbar'
import { ProductList } from '../productslist/ProductList'

function Home() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </div>
  )
}

export default Home
