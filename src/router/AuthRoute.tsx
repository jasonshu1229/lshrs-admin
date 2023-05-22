import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@/store/hooks'
import { searchRoute } from '@/utils/utils'
import { rootRouter } from '@/router'

/**
 * 路由守卫组件
 * @param param0
 * @returns
 */
const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const token = useAppSelector((state) => state.user.token)
  const location = useLocation()

  const route = searchRoute(location.pathname, rootRouter)

  if (token || location.pathname === '/login') {
    return children
  }

  return <Navigate to="/login" replace />
}

export default AuthRoute
