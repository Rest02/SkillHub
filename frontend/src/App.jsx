import React from 'react'
import {Route, Routes} from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import NotFound from '../pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path = "/" element={<AuthPage/>} />
      <Route path = "*" element={<NotFound/>} />
    </Routes>
  )
}

export default App