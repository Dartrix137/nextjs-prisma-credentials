import axios from 'axios'
import ProductCard from '@/components/ProductCard'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";

async function loadProducts(){
  const data=await getServerSession(authOptions)
  const res = await axios.get('http://localhost:3000/api/products' + "?id=" + data.user.id)
  return res.data
}

async function ProductsPage() {
  const products=await loadProducts()
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