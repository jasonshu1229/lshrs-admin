declare module '*.png'

// 类型提示显示展开后的信息
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
