import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 100,
    message: 'Hello Redux Toolkit!',
    address: 'BeiJing'
  },
  reducers: {
    incrementAction(state) {
      state.count = state.count + 1
    },
    changeMessageAction(state, { payload }) {
      state.message = payload
    }
  }
})

export const { incrementAction, changeMessageAction } = counterSlice.actions
export default counterSlice.reducer
