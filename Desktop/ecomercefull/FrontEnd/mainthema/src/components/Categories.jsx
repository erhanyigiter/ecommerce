import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../redux/categoriesSlice';

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = categories.map((category) => (
      <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={category.id}>
        <a className="text-decoration-none" href="">
          <div className="cat-item d-flex align-items-center mb-4">
            <div className="overflow-hidden" style={{ width: '100px', height: '100px' }}>
              <img className="img-fluid" src={category.imageUrl} alt={category.name} />
            </div>
            <div className="flex-fill pl-3">
              <h6>{category.name}</h6>
              <small className="text-body">{category.productCount} Products</small>
            </div>
          </div>
        </a>
      </div>
    ));
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div className="container-fluid pt-5">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Categories</span>
      </h2>
      <div className="row px-xl-5 pb-3">
        {content}
      </div>
    </div>
  );
}
