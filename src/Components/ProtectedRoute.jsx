import React from 'react'
import { useAuth } from '../Context/AuthContext'

import { Navigate } from 'react-router'

const ProtectedRoute = ({children, redirectTo="/Signin"}) => {

  const {        IsLoggedIn,isloading}=  useAuth();

  if(isloading){
    return (
      <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
  )
  }

  if(!IsLoggedIn){
    return <Navigate to={redirectTo} replace/>
  }


  return  children;
}

export default ProtectedRoute
