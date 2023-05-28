import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getUserInfoById, getUserLoginInfo } from '@/service/modules/login'
import { Login } from '@/types/login'

export interface UserState {
  id: string
  name: string
  token: string
  isRemember: boolean
  password: string
  userInfo: Login.UserInfo
}

const initialState: UserState = {
  id: '',
  name: '',
  token: '',
  isRemember: false,
  password: '',
  userInfo: {}
}

export const fetchUserInfoAction = createAsyncThunk(
  'user/getUserInfo',
  async (params: Login.LoginParams, { dispatch }) => {
    // 1. 账号登录，获取用户token信息
    const res = await getUserLoginInfo(params)
    const { name, id, token } = res.data

    // 2. 进行本地存储
    dispatch(changeId(id))
    dispatch(changeUserNanme(name))
    dispatch(changeToken(token))

    // 3. 获取登录用户的详细信息（role信息）
    const userInfoResult = await getUserInfoById(id)
    dispatch(changeUserInfo(userInfoResult.data))
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeId(state, { payload }) {
      state.id = payload
    },
    changeUserNanme(state, { payload }) {
      state.name = payload
    },
    changePassword(state, { payload }) {
      state.password = payload
    },
    changeToken(state, { payload }) {
      state.token = payload
    },
    changeRememberStatus(state, { payload }) {
      state.isRemember = payload
    },
    changeUserInfo(state, { payload }) {
      state.userInfo = payload
    }
  }
})

export const {
  changeId,
  changeUserNanme,
  changePassword,
  changeToken,
  changeRememberStatus,
  changeUserInfo
} = userSlice.actions
export default userSlice.reducer
