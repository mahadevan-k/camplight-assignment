import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks';

import { getUserListPage } from '../actions/userListActions';

export function UserListPages() {
  const dispatch = useAppDispatch();
  const pages = useAppSelector((state) => state.userList.total_pages)

  const loadPage = (page:number) => {
    dispatch(getUserListPage(page));    
  }

  
  const pageset = [...Array(pages)].map((_, i) => (<a href="#" onClick={() => loadPage(i)}>{i+1}</a>)); 

  return (
    <div>
      {pageset}
    </div>
  );
}
