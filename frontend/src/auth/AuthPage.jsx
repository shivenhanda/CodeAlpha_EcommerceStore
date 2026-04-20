import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
  const { user, setUser } = useAuth()
  const [form, setForm] = useState("signup")
  return (
    <div>
      {
        user ? <Dashboard /> :
          <>
            {form === "signup" ? <Signup setUser={setUser} setForm={setForm} /> :
              <Login setUser={setUser} setForm={setForm} />}
          </>
      }
    </div>
  )
}
