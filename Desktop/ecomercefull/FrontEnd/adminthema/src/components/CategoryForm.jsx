import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory, fetchCategories, updateCategory } from '../redux/categoriesSlice';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CategoryForm = ({ currentCategory, setCurrentCategory }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (currentCategory) {
      setName(currentCategory.name);
      setDescription(currentCategory.description);
      setImageUrl(currentCategory.imageUrl);
      setStatus(currentCategory.isStatus);
    }
  }, [currentCategory]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = { name, description, imageUrl, isStatus: status };

    try {
      if (currentCategory) {
        await dispatch(updateCategory({ ...category, id: currentCategory.id })).unwrap();
        Swal.fire('Updated!', 'Category successfully updated.', 'success');
      } else {
        await dispatch(addCategory(category)).unwrap();
        Swal.fire('Added!', 'Category successfully added.', 'success');
      }

      // Kategori ekleme/güncelleme sonrası durumu güncelleyin
      dispatch(fetchCategories());
      navigate('/category-management/update');
    } catch (error) {
      Swal.fire('Error!', 'Category operation failed: ' + error.message, 'error');
    }

    // Formu temizle
    setName('');
    setDescription('');
    setImageUrl('');
    setCurrentCategory(null);
    setStatus(false);
  };

  const handleCancel = () => {
    setCurrentCategory(null);
    navigate('/category-management/update');
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
          required
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
          required
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
          required
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            style={{ marginTop: '10px', maxHeight: '200px' }}
          />
        )}
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            name="status"
            id="status"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />{' '}
          Active
        </Label>
      </FormGroup>
      <Button type="submit" color="primary" className="mr-2">{currentCategory ? 'Update' : 'Add'} Category</Button>
      <Button type="button" onClick={handleCancel} className="ml-2" color="secondary">Cancel</Button>
    </Form>
  );
};

export default CategoryForm;
