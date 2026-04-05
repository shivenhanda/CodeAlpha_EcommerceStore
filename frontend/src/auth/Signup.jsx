import React from 'react'

export default function Signup() {
  return (
    <form method="post" action="/signup" className="flex justify-center items-center flex-col gap-1">
      <label htmlFor="user">Enter Username</label>
      <input type="text" name="user" id="user" className="border border-black rounded-xl text-center"/>
      <label htmlFor="email">Enter Email</label>
      <input type="text" name="email" id="email" className="border border-black rounded-xl text-center"/>
      <label htmlFor="password">Enter Password</label>
      <input type="text" name="password" id="password" className="border border-black rounded-xl text-center"/>
      <button className="border border-black rounded-xl text-center p-2">Signup</button>
    </form>
  )
}
