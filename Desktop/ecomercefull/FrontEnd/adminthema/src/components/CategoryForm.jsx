import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import { addCategory, updateCategory } from '../redux/categoriesSlice';

const CategoryForm = ({ currentCategory, setCurrentCategory }) => {
  const [category, setCategory] = useState({
    name: '',
    description: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentCategory) {
      setCategory(currentCategory);
    } else {
      setCategory({
        name: '',
        description: ''
      });
    }
  }, [currentCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCategory) {
      dispatch(updateCategory(category))
        .unwrap()
        .then(() => {
          Swal.fire('Updated!', 'Category has been updated.', 'success');
          setCurrentCategory(null); // Güncelleme başarılı olduğunda formu temizle
        })
        .catch((error) => {
          Swal.fire('Error!', error.message, 'error');
        });
    } else {
      dispatch(addCategory(category))
        .unwrap()
        .then(() => {
          Swal.fire('Added!', 'Category has been added.', 'success');
        })
        .catch((error) => {
          Swal.fire('Error!', error.message, 'error');
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" value={category.name} onChange={handleChange} required />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="text" name="description" id="description" value={category.description} onChange={handleChange} required />
      </FormGroup>
      <Button type="submit" color="primary">{currentCategory ? 'Update' : 'Add'} Category</Button>
      <Button type="button" color="secondary" onClick={() => setCurrentCategory(null)}>Cancel</Button>
    </Form>
  );
};

export default CategoryForm;
