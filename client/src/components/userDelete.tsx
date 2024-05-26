import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks';

import { deleteUser } from '../actions/userListActions';
import { User } from '../types/userTypes';

import Button from 'react-bootstrap/Button';

export function UserDelete(props:{user: User}) {
  const { user } = props;
  const dispatch = useAppDispatch();

  const callDeleteUser = (e:React.SyntheticEvent) => {
    if(user.id)
      dispatch(deleteUser(user.id));
  }

  return (<Button className="btn-danger" onClick={callDeleteUser}>Delete</Button>);
}
