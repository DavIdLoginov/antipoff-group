import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthForm from './components/auth-form/AuthForm'
import Home from './components/home/Home'
import UserDetails from './components/user/UserInfo'

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={AuthForm} />
        <Route path="/home" Component={Home} />
        <Route path="/user/:id" Component={UserDetails} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
