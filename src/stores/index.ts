import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import userReducer from './modules/user';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    userReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = (): AppDispatch => useDispatch()

export default store
