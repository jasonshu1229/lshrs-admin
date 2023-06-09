import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import counterReducer from './modules/counter'
import userSlice from './modules/user'

const rootReducer = combineReducers({
  // counter: counterReducer,
  user: persistReducer(
    {
      key: 'user',
      storage
    },
    userSlice
  )
})

// redux-persist 持久化配置
const persistConfig = {
  key: 'root', // 必须唯一
  storage,
  blacklist: ['user'] // reducer 里不持久化的数据
}

// 持久化 counterReducer
const persistedCounterReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedCounterReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // 忽略检查 action 的 payload 是否是一个序列化的值
    })
})

// 创建持久化 store
const persistor = persistStore(store)

// 方法一：获取getState的返回值类型，是一个函数类型
// const state = store.getState()
// export type IRootState = typeof state

// 方法二：获取getState的返回值类型，是一个函数类型
type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
export type DispatchType = typeof store.dispatch

export { store, persistor }
