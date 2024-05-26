import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { User, UserListResponse } from '../types/userTypes';

export const getUserListPage = createAsyncThunk<UserListResponse, number, {rejectValue: UserListResponse}>(
  'userList/getUserListPage',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await api.get<UserListResponse>('/api/users?page=${page}');
      return response.data;
    } catch(error: any) {
      if(error.response && error.response.status >=400) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue({errors: {general: ["Failed to fetch user list"]}});
    }
  }
)

