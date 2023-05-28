/** 登录参数 */
export namespace Login {
  export interface LoginParams {
    name: string
    password: string
  }
  export interface UserInfo {
    id?: string
    name?: string
    cellphone?: number
  }
}
