import React from 'react'

export default function Login() {
  return (
    <form action="" className="flex justify-center items-center flex-col gap-1">
      <label htmlFor="user">Enter Username</label>
      <input type="text" name="user" id="user" className="border border-black rounded-xl text-center"/>
      <label htmlFor="password">Enter Password</label>
      <input type="text" name="password" id="password" className="border border-black rounded-xl text-center"/>
      <button className="border border-black rounded-xl text-center p-2">Login</button>
    </form>
  )
}
