import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { fetchProducts, deleteProduct } from '../redux/productsSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ setCurrentProduct }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts()); // Ürünleri yükleme işlemi başlatılıyor
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
            Swal.fire('Deleted!', 'Product has been deleted.', 'success'); // Ürün başarıyla silindiğinde bildirim
          })
          .catch((error) => {
            Swal.fire('Error!', error.message, 'error'); // Hata mesajı
          });
      }
    });
  };

  const handleEdit = (product) => {
    setCurrentProduct(product); // Ürün düzenleme işlemi için setCurrentProduct fonksiyonu çağrılıyor
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    setCurrentProduct(null);
    navigate('/dashboard');
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>; // Ürünler yüklenirken gösterilecek mesaj
  } else if (status === 'succeeded') {
    content = (
      <Table striped>
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>ImageUrl</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.categoryId}</td>
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
              <td>{product.isStatus ? 'Active' : 'Inactive'}</td>
              <td>
                <Button color="warning" onClick={() => handleEdit(product)}>Edit</Button>{' '}
                <Button color="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
                <Button color="secondary" onClick={handleCancel} className="ml-2">Cancel</Button>
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

export default ProductList;
