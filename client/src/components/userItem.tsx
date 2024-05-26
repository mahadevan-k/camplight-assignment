import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks';

import { deleteUser } from '../actions/userListActions';
import { User } from '../types/userTypes';
import { UserDelete } from './userDelete';

export function UserItem(props:{user: User}) {
  const { user } = props;
  const dispatch = useAppDispatch();

  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td><UserDelete user={user}/></td>
    </tr>
  );
}
