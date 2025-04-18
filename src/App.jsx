import React from 'react'
import Header from './Components/Haeder'
import { Routes } from 'react-router-dom'
import Home from "./Pages/Home"
import { Route } from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className=''>

      {/* Header */}

      <Header
      />

      {/* Main Content */}
      <main>
     
      <Outlet/>
      </main>
      
      
    </div>
  )
}

export default App
