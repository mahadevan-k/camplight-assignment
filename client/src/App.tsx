// src/App.tsx
import React from 'react';
import { UserList } from './components/userList';
import { UserAdd } from './components/userAdd';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const App: React.FC = () => {
  return (
    <Container>
      <Row>
        <h3>User List</h3>
      </Row>
     <Row>
        <UserList/>
      </Row>
      <Row>
        <h3>Add User</h3>
      </Row>
      <Row>
        <UserAdd/>
      </Row>
 
    </Container>
  );
};

export default App;
