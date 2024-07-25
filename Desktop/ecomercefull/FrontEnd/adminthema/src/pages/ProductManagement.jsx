import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import { fetchCategories } from '../redux/categoriesSlice';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <h2>Product Management</h2>
      {currentProduct ? (
        <ProductForm
          categories={categories}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
        />
      ) : (
        <Routes>
          <Route path="add" element={<ProductForm categories={categories} setCurrentProduct={setCurrentProduct} />} />
          <Route path="update" element={<ProductList setCurrentProduct={setCurrentProduct} />} />
          <Route path="delete" element={<ProductList setCurrentProduct={setCurrentProduct} />} />
        </Routes>
      )}
    </div>
  );
};

export default ProductManagement;
