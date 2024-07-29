import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, updateCategory } from '../redux/categoriesSlice';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const CategoryForm = ({ currentCategory, setCurrentCategory }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Image URL state

  useEffect(() => {
    if (currentCategory) {
      setName(currentCategory.name);
      setDescription(currentCategory.description);
      setImageUrl(currentCategory.imageUrl); // Set image URL if editing a category
    }
  }, [currentCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = { name, description, imageUrl }; // Include image URL
    if (currentCategory) {
      dispatch(updateCategory({ ...category, id: currentCategory.id }));
    } else {
      dispatch(addCategory(category));
    }
    setName('');
    setDescription('');
    setImageUrl(''); // Clear image URL
    setCurrentCategory(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="imageUrl">Image URL</Label>
        <Input
          type="text"
          name="imageUrl"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </FormGroup>
      <Button type="submit">{currentCategory ? 'Update' : 'Add'} Category</Button>
    </Form>
  );
};

export default CategoryForm;
