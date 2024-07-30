import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './Slices/UserInfoSlice'; 
export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer
  },
})