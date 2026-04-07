import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
export default function Signup({setUser}) {
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors}
  }=useForm()
  const onSubmit=async (data)=>{
    try{
      let res=await fetch("http://localhost:8000/api/SignUp",{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        credentials: "include",
        body:JSON.stringify(data)
      })
      res=await res.json();
      if (res.success) {
        console.log(res.user)
          setUser(res.user);
          navigate("/")
        } else {
          setUser(null);
        }
    }
    catch(error){
      console.log("error",error)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center flex-col gap-1 bg-white">
      <h1 className='border border-black rounded-xl text-center text-3xl p-1 m-3'>Signup</h1>
      <label htmlFor="user">Enter Username</label>
      <input id="user" {...register("user",{required:true})} className="border border-black rounded-xl text-center"/>
      {errors.user && <span>This is required field</span>}
      <label htmlFor="email">Enter Email</label>
      <input id="email" {...register("email",{required:true})} className="border border-black rounded-xl text-center"/>
      {errors.email && <span>This is required field</span>}
      <label htmlFor="password">Enter Password</label>
      <input id="password" {...register("password",{required:true})} className="border border-black rounded-xl text-center"/>
       {errors.password && <span>This is required field</span>}
      <button className="border border-black rounded-xl text-center p-2">Signup</button>
    </form>
  )
}
