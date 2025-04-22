import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './Routes.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

<ThemeProvider>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>

</ThemeProvider>


  </StrictMode>,
)
