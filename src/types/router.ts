export interface RouteObject {
  caseSensitive?: boolean
  children?: RouteObject[]
  element?: React.ReactNode
  path?: string
  meta?: MetaProps
}

export interface MetaProps {
  requiresAuth?: boolean
  key?: string
  title?: string
}
