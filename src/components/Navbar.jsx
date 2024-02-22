import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
async function Navbar() {
    const session = await getServerSession(authOptions)
    return (
        <nav className='flex justify-between items-center text-white bg-gray-800 px-24 py-3 mb-2'>
            <Link href={!session?.user ? "/":"/products"} className='text-3xl font-bold'>AuthCRUD</Link>
            <ul className='flex gap-x-2'>
                {!session?.user ? (
                    <>
                        <li className="rounded hover:bg-slate-600 p-2">
                            <Link href="/auth/login">Login</Link>
                        </li>

                        <li className="rounded hover:bg-slate-600 p-2">
                            <Link href="/auth/register">Register</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="rounded hover:bg-slate-600 p-2">
                            <Link href="/new">New product</Link>
                        </li>

                        <li className="rounded hover:bg-slate-600 p-2">
                            <Link href="/products">Products</Link>
                        </li>
                        
                        <li className="rounded hover:bg-slate-600 p-2">
                            <Link href="/api/auth/signout">Logout</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar