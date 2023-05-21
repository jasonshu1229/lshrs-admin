import hyRequest from '@/service'
import { Login } from '@/types/login'

export function getUserInfo(account: Login.LoginParams) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
