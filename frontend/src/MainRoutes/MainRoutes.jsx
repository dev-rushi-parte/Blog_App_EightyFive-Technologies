import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default MainRoutes
