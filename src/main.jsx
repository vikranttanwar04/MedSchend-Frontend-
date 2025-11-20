import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Nabars/navbar.jsx'
// import { AdminProvider } from './context/adminContext.jsx'
import { FilterProvider } from './context/filterContext.jsx'
import Footer from './components/Footer.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { FetchProvider } from './context/fetchContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <FilterProvider>
    <FetchProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </FetchProvider>
  </FilterProvider>
  // </StrictMode>
)
