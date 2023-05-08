import React from 'react'
import { RouteObject, Navigate } from 'react-router-dom'

import Login from '@/views/login'
import Main from '@/views/main'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/main',
    element: <Main />
  }
]

export default routes
