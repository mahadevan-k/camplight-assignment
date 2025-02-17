import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { getUserListPage, addUser, deleteUser } from '../actions/userListActions';
import { User, UserListResponse, UserAddResponse, UserDeleteResponse } from '../types/userTypes';

interface UserListState {
  page: number,
  total_pages: number,
  users: User[],
  errors: {[id: string]: string[]}
  loading: boolean
}

const initialState: UserListState = {
  page: 1,
  total_pages: 1,
  users: [],
  errors: {},
  loading: false
}

const userListSlice:Slice<UserListState> = createSlice({
  name: "userList",
  initialState,
  reducers: {
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
        if(action.payload.pages)
          state.total_pages = action.payload.pages;
      })
      .addCase(getUserListPage.rejected, (state, action) => {
        state.loading = false
        if(action.payload?.errors)
          state.errors = action.payload.errors;
      })
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true
        state.errors = {}
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<UserAddResponse>) => {
        state.loading = false;
        if(action.payload.user && state.page==1)
          state.users = [ action.payload.user, ...state.users ]
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false
        if(action.payload?.errors)
          state.errors = action.payload.errors;
      })

    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<UserDeleteResponse>) => {
        state.loading = false;
        if(action.payload.id)
          state.users=state.users.filter(user => user.id!=action.payload.id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        if(action.payload?.errors)
          state.errors = action.payload.errors;
      })
  },
});

export const { nextPage, prevPage, pageItems, errors } = userListSlice.actions;
export default userListSlice.reducer;
