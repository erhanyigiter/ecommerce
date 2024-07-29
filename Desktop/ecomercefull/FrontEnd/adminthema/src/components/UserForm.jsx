import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { addUser, updateUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
// import './UserForm.css';

const UserForm = ({ currentUser, setCurrentUser }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    address: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser({
        name: '',
        email: '',
        address: ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      dispatch(updateUser(user))
        .unwrap()
        .then(() => {
          Swal.fire('Updated!', 'User has been updated.', 'success');
          setCurrentUser(null); // Güncelleme başarılı olduğunda formu temizle
        })
        .catch((error) => {
          Swal.fire('Error!', error.message, 'error');
        });
    } else {
      dispatch(addUser(user))
        .unwrap()
        .then(() => {
          Swal.fire('Added!', 'User has been added.', 'success');
        })
        .catch((error) => {
          Swal.fire('Error!', error.message, 'error');
        });
    }
  };
  const handleCancel = () => {
    setCurrentUser(null);
    navigate(-1);
  }

  return (
    <Card className="user-form-card">
      <CardBody>
        <CardTitle tag="h5">{currentUser ? 'Update User' : 'Add User'}</CardTitle>
        <CardSubtitle className="mb-3">{currentUser ? 'Update the user details below.' : 'Fill out the form below to add a new user.'}</CardSubtitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={user.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={user.email} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" value={user.address} onChange={handleChange} required />
          </FormGroup>
          <Button type="submit" color="primary" className="mr-2">{currentUser ? 'Update' : 'Add'} User</Button>
          <Button type="button" color="secondary" onClick= {handleCancel}>Cancel</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default UserForm;
