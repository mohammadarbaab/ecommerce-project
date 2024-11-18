import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductsDetails from '../features/productslist/components/productsDetails'
import Footer from '../features/comman/Footer'
function ProductDetailPage() {
  return (
    <div>
    <Navbar>
        <ProductsDetails />
    </Navbar>
    <Footer></Footer>
    </div>
  )
}

export default ProductDetailPage
