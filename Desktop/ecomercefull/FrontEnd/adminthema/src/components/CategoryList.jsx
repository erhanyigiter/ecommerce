import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Card, CardBody, Row, Col, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { fetchCategories, deleteCategory } from '../redux/categoriesSlice';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';

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
            Swal.fire('Error!', 'Category could not be deleted! If there are any products in it, delete them first!', 'error');
          });
      }
    });
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    setCurrentCategory(null);
    navigate('/dashboard');
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <Table striped responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Image</th> 
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td><img src={category.imageUrl} alt={category.name} width="50" height="50" /></td> 
              <td 
                style={{ color: category.isStatus ? 'green' : 'red' }}>
                {category.isStatus ? 'Active' : 'Passive'}
                </td>
              <td>
                <Button color="warning" onClick={() => handleEdit(category)}>Edit</Button>
                {' '}
                <Button color="danger" onClick={() => handleDelete(category.id)}>Delete</Button>
                {' '}
                <Button color="secondary" onClick={handleCancel}>Cancel</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      {content}
      <Row className="mt-4">
        <Col md="12">
          <Card className="shadow-sm border-10">
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <FaInfoCircle className="text-primary me-2" size={30} />
                <CardTitle tag="h5" className="mb-0">Information</CardTitle>
              </div>
              <div> 
                <ul>
                  <li>If you set the category status to passive, your published categories will be suspended.</li>
                  <li>If you set the category status to passive, your published products will be suspended.</li>
                  <li>Before trying to delete a category, please make sure there are no products in that category.</li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryList;
