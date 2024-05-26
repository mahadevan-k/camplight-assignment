// src/App.tsx
import React from 'react';
import { UserList } from './components/userList';
import { UserAdd } from './components/userAdd';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <UserAdd/>
      <UserList/>
    </div>
  );
};

export default App;
