import hyRequest from '@/service'
import { Login } from '@/types/login'

/**
 *
 * @param account 登录参数
 * @returns 返回登录用户的token信息
 */
export function getUserLoginInfo(account: Login.LoginParams) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

/**
 *
 * @param id 用户id
 * @returns 返回详细的用户信息
 */
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

/**
 *
 * @param id 角色id
 * @returns 返回角色对应的菜单树信息
 */
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}

// 添加 token 鉴权的方式一，第二种方式是在axios响应拦截器中添加
/*
export function getUserInfoById(id: number) {
  const userPersist = localStorage.getItem('persist:user')
  const token = userPersist ? JSON.parse(userPersist).token : ''

  return hyRequest.get({
    url: `/users/${id}`
    headers: {
      Authorization: 'Bearer ' + token.replace(/^"(.*)"$/, '$1')
    }
  })
}
*/
