import React, { createContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import PrivateRoutes from './privateRoutes'
import PublicRoutes from './publicRoutes'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Layout from '../components/layout/Layout'

export const AppContext =createContext();

const Router = () => {
  const [isUserLogged, setIsUserLogged] = useState(true);
  return (
    <BrowserRouter basename='my-books-app'>
        <AppContext.Provider value={{isUserLogged, setIsUserLogged}}>
          <Routes>
            <Route  element={<Layout isAuthenticate={isUserLogged}/>}>
              <Route element={<PrivateRoutes isAuthenticate={isUserLogged}/>}>
                <Route index element={<Home/>} />
              </Route>
              <Route element={<PublicRoutes  isAuthenticate={isUserLogged} />} >
                  <Route path='login' element={<Login/>} />
                  <Route path='register' element={<Register/>} />
              </Route>
            </Route>
          </Routes>
        </AppContext.Provider>
    </BrowserRouter>
  )
}

export default Router
