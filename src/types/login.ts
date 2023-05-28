/** 角色参数 */
namespace Role {
  export interface Type {
    id: number
    name: string
    intro: string
    createAt: string
    updateAt: string
  }
}

/** 部门参数 */
namespace Department {
  export interface Type {
    id: number
    name: string
    parentId: any
    createAt: string
    updateAt: string
    leader: string
  }
}

namespace Children {
  export interface Type {
    id: number
    url: string
    name: string
    sort: number
    type: number
    children: any
    parentId: number
  }
}

/** 登录参数 */
export namespace Login {
  export interface LoginParams {
    name: string
    password: string
  }
}

/** 用户参数 */
export namespace User {
  export interface UserInfo {
    id?: number
    name?: string
    realname?: string
    cellphone?: number
    enable?: number
    createAt?: string
    updateAt?: string
    role?: Role.Type
    department?: Department.Type
  }
  export interface UserMenus {
    id?: number
    name?: string
    type?: number
    url?: string
    icon?: string
    sort?: number
    children?: Children.Type[]
  }
}
