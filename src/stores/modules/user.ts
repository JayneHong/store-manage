import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    useInfo: {
      username: '',
      userId: '',
    },
  },
  reducers: {
    /** 设置用户信息 */
    setUserInfo: (state, action) => {
      state.useInfo = action.payload
    },
  },
})

export const { setUserInfo } = counterSlice.actions
export default counterSlice.reducer
