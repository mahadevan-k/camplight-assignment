import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { User, UserData, UserListResponse, UserAddResponse, UserDeleteResponse } from '../types/userTypes';

export const getUserListPage = createAsyncThunk<UserListResponse, number, {rejectValue: UserListResponse}>(
  'userList/getUserListPage',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await api.get<UserListResponse>(`/api/users?page=${page}`);
      return response.data;
    } catch(error: any) {
      if(error.response && error.response.status >=400) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue({errors: {general: ["Failed to fetch user list"]}});
    }
  }
)

export const addUser = createAsyncThunk<UserAddResponse, UserData, {rejectValue: UserAddResponse}>(
  'userList/addUser',
  async (userData: UserData, { rejectWithValue }) => {
    try {
      const { name, email, phone } = userData;
      const response = await api.post<UserAddResponse>('/api/users', { name, email, phone });
      return response.data;
    } catch(error: any) {
      if(error.response && error.response.status >=400) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue({errors: {general: ["Failed to add user"]}});
    }
  }
)

export const deleteUser = createAsyncThunk<UserDeleteResponse,number,{rejectValue:  UserDeleteResponse}>(
  'userList/deleteUser',
  async (user_id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete<UserAddResponse>(`/api/users/${user_id}`);
      return { id: user_id }
    } catch(error: any) {
      if(error.response && error.response.status >=400) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue({errors: {general: ["Failed to delete user"]}});
    }

  }
)
