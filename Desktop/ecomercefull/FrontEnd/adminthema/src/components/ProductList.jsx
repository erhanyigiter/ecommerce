import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Card, CardBody, Row, Col, CardTitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { fetchProducts, deleteProduct } from '../redux/productsSlice';
import { fetchCategories } from '../redux/categoriesSlice';
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa'; 

const ProductList = ({ setCurrentProduct }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories); 
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
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
        dispatch(deleteProduct(id))
          .unwrap()
          .then(() => {
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', error.message, 'error');
          });
      }
    });
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    setCurrentProduct(null);
    navigate('/dashboard');
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <Table striped>
        <thead>
          <tr>
            <th>Category</th>
            <th>Product</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>ImageUrl</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const category = categories.find(cat => cat.id === product.categoryId); // Kategori ID'si eşleştiriliyor
            return (
              <tr key={product.id}>
                <td>{category ? category.name : 'Unknown Category'}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </td>
                <td style={{ color: product.isStatus ? 'green' : 'red' }}>
                  {product.isStatus ? 'Active' : 'Passive'}
                </td>
                <td>
                  <Button color="warning" onClick={() => handleEdit(product)}>Edit</Button>{' '}
                  <Button color="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
                  <Button color="secondary" onClick={handleCancel} className="ml-2">Cancel</Button>
                </td>
              </tr>
            );
          })}
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
                  <li>If you set the status of the products passive, your published products will be suspended.</li>
                  <li>When adding product, its description should be like this; <br></br> "Color: Black, White | Sizes: S, M, L | Elegant and versatile shirt, suitable for all occasions."
                <br></br>  Because your products gain the filtering feature in this way.
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductList;
