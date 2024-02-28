"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function Buttons({ productId }) {
    const router = useRouter()
    const session=useSession()
    const handleDelete = async (e) => {
        e.preventDefault()
        if (confirm('Are you sure you want to delete this product?')) {
            const res = await axios.delete(`${env(NEXTAUTH_URL)}/api/products/${productId}?id=${session.data.user.id}`)
            console.log(session.data.user.id)
            if (res.status === 204) {
                router.push('/products')
                router.refresh()
            }
        }
    }
    return (
        <div className='flex gap-x-2 justify-center mt-2'>
            <button className='bg-red-500 hover:bg-red-700 text-white py-2 px-3 rounded' onClick={handleDelete}>Delete</button>
            <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded' onClick={()=>router.push(`/products/edit/${productId}`)}>Edit</button>
        </div>
    )
}

export default Buttons