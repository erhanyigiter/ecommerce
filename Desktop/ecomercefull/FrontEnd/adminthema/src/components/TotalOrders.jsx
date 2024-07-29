import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { fetchTotalOrders } from '../redux/totalOrdersSlice';
import '../Css/TotalCard.css';

const TotalOrders = () => {
  const dispatch = useDispatch();
  const totalOrders = useSelector((state) => state.totalOrders.total);
  const status = useSelector((state) => state.totalOrders.status);
  const error = useSelector((state) => state.totalOrders.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTotalOrders());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <Card className="total-product-card">
        <CardBody>
          <CardTitle tag="h5">Total Orders</CardTitle>
          <CardText className="total-count">{totalOrders}</CardText>
        </CardBody>
      </Card>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <div className="total-product-container">{content}</div>;
};

export default TotalOrders;
