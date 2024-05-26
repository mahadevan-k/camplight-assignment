import React, { useState, useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks';

import { addUser } from '../actions/userListActions';
import { User, UserData } from '../types/userTypes';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function UserAdd() {
  const dispatch = useAppDispatch();
  const errors = useAppSelector((state) => state.userList.errors);


  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const phone = useRef<HTMLInputElement>(null);

  const submitForm = (e:React.SyntheticEvent) => {
    const userData:UserData = { name: name.current?.value, email: email.current?.value, phone: phone.current?.value }
    dispatch(addUser(userData));
  }

  console.log("Parsing errors");
  const nameErrors=errors?.name?.map((error) => (<span>{error}</span>));
  const emailErrors=errors?.email?.map((error) => (<span>{error}</span>));
  const phoneErrors=errors?.phone?.map((error) => (<span>{error}</span>));
  const generalErrors=errors?.general?.map((error) => (<span>{error}</span>));


  return (
    <Form noValidate>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="John Doe" name="name" ref={name}/>
        <span className="text-danger">{nameErrors}</span>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="johndoe@gmail.com" name="email" ref={email}/>
        <span className="text-danger">{emailErrors}</span>
      </Form.Group>
      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="International Phone Number" name="phone" ref={phone}/>
        <span className="text-danger">{phoneErrors}</span>
      </Form.Group>
      <Form.Group>
        <span className="text-danger">{generalErrors}</span>
        <Button onClick={submitForm}>Submit</Button>
      </Form.Group>
     </Form>
  )
}
