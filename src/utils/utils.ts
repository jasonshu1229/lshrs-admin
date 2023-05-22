import { RouteObject } from '@/types/router'

/**
 * @description 根据当前访问地址获取当前路由对象
 * @param path 当前访问地址
 * @param routes 路由列表
 * @returns {} 返回当前路由对象
 */
export const searchRoute = (path: string, routes: RouteObject[] = []) => {
  let result: RouteObject = {}
  for (const item of routes) {
    // 没有子路由
    if (item.path === path) return item
    if (item.children) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}
