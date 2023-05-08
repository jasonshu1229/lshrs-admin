import React from 'react'
import { RouteObject, Navigate } from 'react-router-dom'

import Login from '@/views/login'
import Main from '@/views/main'
import NotFound from '@/views/not-found'

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
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default routes