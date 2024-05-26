import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks';

import { getUserListPage } from '../actions/userListActions';
import { User } from '../types/userTypes';
import { UserItem } from './userItem';
import { UserListPages } from './userListPages';

import Table from 'react-bootstrap/Table';

export function UserList() {
  const users:User[] = useAppSelector((state) => state.userList.users);
  const page = useAppSelector((state) => state.userList.page);
  const dispatch = useAppDispatch();

  const userItems = users.map(user => (<UserItem user={user}/>));

  useEffect(() => {
    dispatch(getUserListPage(page));
  },[]);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userItems}
        </tbody>
      </Table>
      <UserListPages/>
    </div>
  ); 
}
