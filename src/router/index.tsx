import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import Login from '@/views/login'
import Main from '@/views/main'
import NotFound from '@/views/not-found'
import Demo from '@/views/demo'

import { RouteObject } from '@/types/router'

export const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/main" replace />
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: '登录页',
      key: 'login'
    }
  },
  {
    path: '/main',
    element: <Main />,
    meta: {
      requiresAuth: true,
      title: '主页',
      key: 'main'
    }
  },
  {
    path: '/demo',
    element: <Demo />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

const Router = () => {
  const routes = useRoutes(rootRouter)
  return routes
}

export default Router
