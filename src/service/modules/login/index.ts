import hyRequest from '@/service'
import { Login } from '@/types/login'

export function getUserLoginInfo(account: Login.LoginParams) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  const userPersist = localStorage.getItem('persist:user')
  const token = userPersist ? JSON.parse(userPersist).token : ''

  return hyRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: 'Bearer ' + token.replace(/^"(.*)"$/, '$1')
    // }
  })
}
