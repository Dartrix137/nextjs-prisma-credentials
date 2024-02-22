"use client"
import { useForm } from 'react-hook-form'
import {useRouter} from 'next/navigation'
function RegisterPage() {
    const { register, handleSubmit, formState:{errors} } = useForm()
    const router=useRouter()
    const onSubmit=handleSubmit(async(data)=>{
        if(data.password!== data.confirmPassword){
            return alert("Passwords do not match")
        }
        const res= await fetch("http://localhost:3000/api/auth/register",{
            method:"POST",
            body: JSON.stringify({
                username:data.username,
                email:data.email,
                password:data.password
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        console.log(res)
        if(res.ok){
            router.push('/auth/login')
        }
    })
    return (
        <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
            <form className="w-1/4" onSubmit={onSubmit}>
                <h1 className='text-slate-200 font-bold text-4xl mb-4'>Register</h1>
                <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">Username</label>
                <input type="text"
                    {...register("username", {
                        required: {
                            value:true,
                            message:"Username is required"
                        }
                    })}
                    className='p-3 rounded block bg-slate-900 text-slate-300 w-full'
                    placeholder='Username123'
                />
                {
                    errors.username && (
                        <span className='text-red-600 font bold text-sm'>{errors.username.message}</span>
                    )
                }
                <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">Email</label>
                <input type="email"
                    {...register("email", {
                        required: {
                            value:true,
                            message: "Email is required"
                        }
                    })}
                    className='p-3 rounded block bg-slate-900 text-slate-300 w-full'
                    placeholder='username@email.com'
                />
                {
                    errors.email && (
                        <span className='text-red-600 font bold text-sm'>{errors.email.message}</span>
                    )
                }
                <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">Password</label>
                <input type="password"
                    {...register("password", {
                        required: {
                            value:true,
                            message:"Password is required"
                        }
                    })}
                    className='p-3 rounded block bg-slate-900 text-slate-300 w-full'
                    placeholder='*******'
                />
                {
                    errors.password && (
                        <span className='text-red-600 font bold text-sm'>{errors.password.message}</span>
                    )
                }
                <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block text-sm">Confirm password</label>
                <input type="password"
                    {...register("confirmPassword", {
                        required: {
                            value:true,
                            message:"Confirm password is required"
                        }
                    })}
                    className='p-3 rounded block bg-slate-900 text-slate-300 w-full'
                    placeholder='*******'
                />
                {
                    errors.confirmPassword && (
                        <span className='text-red-600 font bold text-sm'>{errors.confirmPassword.message}</span>
                    )
                }
                <button type="submit" className='w-full rounded bg-blue-600 hover:bg-blue-800 text-white text-xl p-2 mt-2'>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage