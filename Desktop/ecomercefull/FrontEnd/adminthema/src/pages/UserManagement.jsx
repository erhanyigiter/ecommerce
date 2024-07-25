import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

const UserManagement = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      <h2>User Management</h2>
      {currentUser ? (
        <UserForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <Routes>
          <Route path="add" element={<UserForm currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="update" element={<UserList setCurrentUser={setCurrentUser} />} />
          <Route path="delete" element={<UserList setCurrentUser={setCurrentUser} />} />
        </Routes>
      )}
    </div>
  );
};

export default UserManagement;
