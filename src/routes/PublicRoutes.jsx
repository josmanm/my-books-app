import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const PublicRoutes = ({isAuthenticate, redirectPath='/',children}) => {
    if(isAuthenticate) return <Navigate to={redirectPath} />
    return (
    <div>
      {children ? children:<Outlet/>}
    </div>
  )
}

export default PublicRoutes
