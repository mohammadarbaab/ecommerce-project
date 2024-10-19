import React from 'react'
import Navbar from '../features/navbar/Navbar' 
import ProductForm from '../features/admin/ProductForm'
function AdminProductFormPage() {
  return (
    <div>
    <Navbar>
        <ProductForm />
    </Navbar>
    </div>
  )
}

export default AdminProductFormPage
