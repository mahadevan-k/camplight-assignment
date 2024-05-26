import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { getUserListPage } from '../actions/userListActions';
import { User, UserListResponse } from '../types/userTypes';

interface UserListState {
  page: number,
  count: number,
  users: User[],
  errors: {[id: string]: string[]}
  loading: boolean
}

const initialState: UserListState = {
  page: 1,
  count: 0,
  users: [],
  errors: {},
  loading: false
}

const userListSlice:Slice<UserListState> = createSlice({
  name: "userList",
  initialState,
  reducers: {
    addUser: (state: UserListState,action: PayloadAction<User>) => {
      if(state.page==1)
        state.users=[ action.payload, ...state.users ]
    },
    deleteUser: (state: UserListState, action: PayloadAction<number>) => {
      state.users=state.users.filter(user => user.id!=action.payload);
    },
    nextPage: (state: UserListState) => {
      state.page += 1;
    },
    prevPage: (state: UserListState) => {
      state.page -=1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserListPage.pending, (state) => {
        state.loading = true
      })
      .addCase(getUserListPage.fulfilled, (state, action: PayloadAction<UserListResponse>) => {
        state.loading = false;
        if(action.payload.users)
          state.users = action.payload.users;
      })
      .addCase(getUserListPage.rejected, (state, action) => {
        state.loading = false
        if(action.payload?.errors)
          state.errors = action.payload.errors;
      })
  },
});

export const { addUser, deleteUser, nextPage, prevPage, pageItems, errors } = userListSlice.actions;
export default userListSlice.reducer;
