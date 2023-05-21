import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getUserInfo } from '@/service/modules/login'
import { Login } from '@/types/login'

export interface UserState {
  id: string
  name: string
  token: string | undefined
}

const initialState: UserState = {
  id: '',
  name: '',
  token: ''
}

export const fetchUserInfoAction = createAsyncThunk(
  'user/getUserInfo',
  async (params: Login.LoginParams, { dispatch }) => {
    const res = await getUserInfo(params)
    const { name, id, token } = res.data
    dispatch(changeId(id))
    dispatch(changeUserNanme(name))
    dispatch(changeToken(token))
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
    changeToken(state, { payload }) {
      state.token = payload
    }
  }
})

export const { changeId, changeUserNanme, changeToken } = userSlice.actions
export default userSlice.reducer
