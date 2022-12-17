import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../Pages/Account/SignIn'
import SignUp from '../Pages/Account/SignUp'
import HomePage from '../Pages/HomePage'

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </>
  )
}

export default MainRoutes
