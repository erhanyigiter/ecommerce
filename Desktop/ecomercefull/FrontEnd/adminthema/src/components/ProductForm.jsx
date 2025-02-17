import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import Swal from 'sweetalert2';
import { addProduct, updateProduct, fetchProducts } from '../redux/productsSlice';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ currentProduct, setCurrentProduct, categories = [] }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: '',
    isStatus: false
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentProduct) {
      setProduct(currentProduct);
    } else {
      setProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        imageUrl: '',
        categoryId: '',
        isStatus: false
      });
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentProduct) {
      dispatch(updateProduct(product))
        .unwrap()
        .then(() => {
          Swal.fire('Updated!', 'Product has been updated.', 'success');
          setCurrentProduct(null); // Güncelleme başarılı olduğunda formu temizle
          dispatch(fetchProducts()); // Ürünler listesini güncelle
          navigate('/product-management/update'); // Yönlendirme yap
        })
        .catch((error) => {
          Swal.fire('Error!', error.message, 'error');
        });
    } else {
      dispatch(addProduct(product))
        .unwrap()
        .then(() => {
          Swal.fire('Added!', 'Product has been added.', 'success');
          setProduct({ // Ürün eklendikten sonra formu temizle
            name: '',
            description: '',
            price: '',
            stock: '',
            imageUrl: '',
            categoryId: '',
            isStatus: false
          });
          dispatch(fetchProducts()); // Ürünler listesini güncelle
          navigate('/product-management/update'); // Yönlendirme yap
        })
        .catch((error) => {
          Swal.fire('Error!', error.message, 'error');
        });
    }
  };

  const handleCancel = () => {
    setCurrentProduct(null);
    navigate('/product-management/update');
  }

  return (
    <Card className="product-form-card">
      <CardBody>
        <CardTitle tag="h5">{currentProduct ? 'Update Product' : 'Add Product'}</CardTitle>
        <CardSubtitle className="mb-3">{currentProduct ? 'Update the product details below.' : 'Fill out the form below to add a new product.'}</CardSubtitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" value={product.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description (You can enter single or multiple size and color.) </Label>
            <Input
              type="text"
              name="description"
              id="description"
              value={product.description}
              onChange={handleChange}
              placeholder='Color: Black, White | Sizes: S, M, L | Description.'
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="price">Price</Label>
            <Input type="number" name="price" id="price" value={product.price} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="stock">Stock</Label>
            <Input type="number" name="stock" id="stock" value={product.stock} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="imageUrl">Image URL</Label>
            <Input type="text" name="imageUrl" id="imageUrl" value={product.imageUrl} onChange={handleChange} required />
            {product.imageUrl && (
              <img src={product.imageUrl}
                alt="Product"
                className="img-fluid mt-2"
                style={{ marginTop: '10px', maxHeight: '200px' }}
              />
            )}

          </FormGroup>
          <FormGroup>
            <Label for="categoryId">Category</Label>
            <Input type="select" name="categoryId" id="categoryId" value={product.categoryId} onChange={handleChange} required>
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" name="isStatus" checked={product.isStatus} onChange={handleChange} />{' '}
              Status
            </Label>
          </FormGroup>
          <Button type="submit" color="primary" className="mr-2">{currentProduct ? 'Update' : 'Add'} Product</Button>
          <Button type="button" color="secondary" onClick={handleCancel}>Cancel</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default ProductForm;
