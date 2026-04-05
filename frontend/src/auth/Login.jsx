import React from 'react'
import { useForm } from 'react-hook-form'

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors}
  }=useForm()
  const onSubmit=async(data)=>{
    try{
      let res=await fetch("http://localhost:8000/api/Login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(data)
      })
      res=await res.json()
      if(!res.success){
        alert(res.message)
      }
      else{
        alert(res.message)
      }
    }
    catch(error){
      console.log("error",error)
    }
  }
  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center flex-col gap-1">
      <h1 className='border border-black rounded-xl text-center text-3xl p-1 m-3'>Login</h1>
      <label htmlFor="user">Enter Username</label>
      <input id="user" {...register("user",{required:true})} className="border border-black rounded-xl text-center"/>
      {errors.user && <span>This is required field</span>}
      <label htmlFor="password">Enter Password</label>
      <input id="password" {...register("password",{required:true})} className="border border-black rounded-xl text-center"/>
      {errors.password && <span>This is required field</span>}
      <button className="border border-black rounded-xl text-center p-2">Login</button>
    </form>
  )
}
