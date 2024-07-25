import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { fetchTotalProducts } from '../redux/totalProductSlice';
import '../Css/TotalProduct.css';

const TotalProduct = () => {
  const dispatch = useDispatch();
  const totalProducts = useSelector((state) => state.totalProduct.total);
  const status = useSelector((state) => state.totalProduct.status);
  const error = useSelector((state) => state.totalProduct.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTotalProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <Card className="total-product-card">
        <CardBody>
          <CardTitle tag="h5">Total Products</CardTitle>
          <CardText className="total-count">{totalProducts}</CardText>
        </CardBody>
      </Card>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <div className="total-product-container">{content}</div>;
};

export default TotalProduct;
