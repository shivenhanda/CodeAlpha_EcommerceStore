import React, { useEffect } from 'react'
import Signup from './Signup'
import Login from './Login'

export default function AuthPage({user,setUser}) {
  return (
    <div>
        <div>
            <Signup/>
            <Login/>
        </div>
    </div>
  )
}
