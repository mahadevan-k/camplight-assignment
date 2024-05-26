// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userListReducer from './reducers/userListReducer';


const store = configureStore({
  reducer: {
    userList: userListReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

