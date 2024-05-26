import React, { useState, useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks';

import { addUser } from '../actions/userListActions';
import { User, UserData } from '../types/userTypes';

export function UserAdd() {
  const dispatch = useAppDispatch();
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);

  const submitForm = (e:React.SyntheticEvent) => {
    const errors: {[id: string]: string[]} = {name: [], email: [], phone: [], general: []};
    let hasErrors: boolean = false;
    if(!name.current?.value) {
      hasErrors=true;
      errors.name=["Name is required"]
    }

    if(!email.current?.value) {
      hasErrors=true;
      errors.email=["Email is required"]
    }

    if(!phone.current?.value) {
      hasErrors=true;
      errors.phone=["Phone is required"]
    }

    if(!hasErrors) {
      const userData:UserData = { name: name.current?.value, email: email.current?.value, phone: phone.current?.value }
      dispatch(addUser(userData));
    }
  }


  return (
    <div>
      <input name='name' ref={name}/>
      <input name='email' ref={email}/>
      <input name='phone' ref={phone}/>
      <button onClick={submitForm} >Submit</button>
     </div>
  )
}
