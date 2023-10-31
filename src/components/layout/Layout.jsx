import React, { createContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import FooterPages from '../footerPages/footerPages'

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
      <FooterPages />
    </div>
  )
}

export default Layout