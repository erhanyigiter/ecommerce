import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import { fetchCategories, deleteCategory } from '../redux/categoriesSlice';

const CategoryList = ({ setCurrentCategory }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
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
        dispatch(deleteCategory(id))
          .unwrap()
          .then(() => {
            Swal.fire('Deleted!', 'Category has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', error.message, 'error');
          });
      }
    });
  };

  const handleEdit = (category) => {
    setCurrentCategory(category); // Fonksiyonu kullan
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
            <th>Description</th>
            <th>Image</th> {/* Image Column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td><img src={category.imageUrl} alt={category.name} width="50" height="50" /></td> {/* Display Image */}
              <td>
                <Button color="warning" onClick={() => handleEdit(category)}>Edit</Button>
                {' '}
                <Button color="danger" onClick={() => handleDelete(category.id)}>Delete</Button>
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

export default CategoryList;
