"use client"
import {useState} from 'react'
import { useForm } from 'react-hook-form'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'
function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router=useRouter()
  const [error, setError]=useState(null)
  const onSubmit=handleSubmit(async(data)=>{
    const res=await signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false
    })
    if(res.error){
      setError(res.error)
    }else{
      router.push("/dashboard")
      router.refresh()
    }
  })
  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form className="w-1/4" onSubmit={onSubmit}>
        {error && (
          <p className='bg-red-500 text-white rounded p-3 text-center'>{error}</p>
        )}
        <h1 className='text-slate-200 font-bold text-4xl mb-4'>Login</h1>
        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">Email</label>
        <input type="email"
          {...register("email", {
            required: {
              value: true,
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
              value: true,
              message: "Password is required"
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
        <button type="submit" className='w-full rounded bg-blue-600 hover:bg-blue-800 text-white text-xl p-2 mt-2'>Signin</button>
      </form>
    </div>
  )
}

export default LoginPage