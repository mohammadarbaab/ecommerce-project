import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductsDetails from '../productslist/components/productsDetails'

function ProductDetailPage() {
  return (
    <div>
    <Navbar>
        <ProductsDetails />
    </Navbar>
    </div>
  )
}

export default ProductDetailPage