"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const session = useSession()

  const handleProducts = async () => {
    if (session.data) {
      const res = await axios.get('http://localhost:3000/api/products' + "?id=" + session.data.user.id)
      setProducts(res.data)
    }
  }

  useEffect(() => {
    handleProducts()
  }, [session])



  return (
    <>
      {products && (
        <div className='grid gap-4 grid-cols-4 text-gray-800 mt-4'>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>)}
    </>
  )
}

export default ProductsPage