import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CategoryForm from '../components/CategoryForm';
import CategoryList from '../components/CategoryList';
import { fetchCategories } from '../redux/categoriesSlice';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <h2>Category Management</h2>
      {currentCategory ? (
        <CategoryForm
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
        />
      ) : (
        <Routes>
          <Route path="add" element={<CategoryForm setCurrentCategory={setCurrentCategory} />} />
          <Route path="update" element={<CategoryList setCurrentCategory={setCurrentCategory} />} />
          <Route path="delete" element={<CategoryList setCurrentCategory={setCurrentCategory} />} />
        </Routes>
      )}
    </div>
  );
};

export default CategoryManagement;
