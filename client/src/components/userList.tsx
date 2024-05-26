import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks';

import { getUserListPage } from '../actions/userListActions';
import { User } from '../types/userTypes';

export function UserList() {
  const users:User[] = useAppSelector((state) => state.userList.users);
  const page = useAppSelector((state) => state.userList.page);
  const dispatch = useAppDispatch();

  const userItems = users.map(user => (<li>{user.name}</li>));

  useEffect(() => {
    dispatch(getUserListPage(page));
  },[]);

  return (<ul>{userItems}</ul>);
}
