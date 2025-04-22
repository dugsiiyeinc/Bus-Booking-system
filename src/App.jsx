import React from 'react'
import Header from './Components/Haeder'
import { Routes } from 'react-router-dom'
import Home from "./Pages/Home"
import { Route } from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div className=''>

      {/* Header */}

      <Header
      />

      {/* Main Content */}
      <main>

        
      <Toaster reverseOrder={false} />
      <Outlet/>
      </main>

      <Footer/>

      
      
      
    </div>
  )
}

export default App
