import React from 'react'
import { useAuth } from '../context/AuthContext'

function AuthPage() {

  const {text, x} = useAuth()
  console.log(text, x)


  return (
    <div>AuthPage</div>
  )
}

export default AuthPage