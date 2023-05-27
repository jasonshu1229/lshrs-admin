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
  const { pathname } = useLocation()
  const route = searchRoute(pathname, rootRouter)

  // 判断是否有Token
  const token = useAppSelector((state) => state.user.token)

  // 当前路由不需要登录，直接返回该路由对应的组件
  if (!route.meta?.requiresAuth) return children

  if (!token) {
    return <Navigate to="/login" replace />
  }

  // 当前登录用户有权限访问该路由，返回该路由对应的组件
  return children
}

export default AuthRoute
