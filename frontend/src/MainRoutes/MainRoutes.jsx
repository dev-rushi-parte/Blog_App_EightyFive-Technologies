import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../Pages/Account/SignUp'
import HomePage from '../Pages/HomePage'

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/singup' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default MainRoutes
