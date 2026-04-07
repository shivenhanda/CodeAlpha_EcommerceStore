import React, { useEffect } from 'react'
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard'

export default function AuthPage({ user, setUser }) {
  return (
    <div>
      {
        user ? <Dashboard user={user}/> :
          <>
            <Signup setUser={setUser} />
            <Login setUser={setUser} />
          </>
      }
    </div>
  )
}
