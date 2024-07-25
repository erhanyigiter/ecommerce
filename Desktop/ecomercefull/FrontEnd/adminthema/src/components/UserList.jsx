import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import { fetchUsers, deleteUser } from '../redux/userSlice';

const UserList = ({ setCurrentUser }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id))
          .unwrap()
          .then(() => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', error.message, 'error');
          });
      }
    });
  };

  const handleEdit = (user) => {
    setCurrentUser(user); // Edit butonuna tıklandığında user'ı ayarla
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>
                <Button color="warning" onClick={() => handleEdit(user)}>Edit</Button>
                {' '}
                <Button color="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
};

export default UserList;
