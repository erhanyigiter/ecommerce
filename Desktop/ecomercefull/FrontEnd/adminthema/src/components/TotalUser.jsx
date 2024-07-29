import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom'; // Link bileşeni eklendi
import { fetchTotalUsers } from '../redux/totalUserSlice';
import '../Css/TotalCard.css';

const TotalUser = () => {
  const dispatch = useDispatch();
  const totalUsers = useSelector((state) => state.totalUser.total);
  const status = useSelector((state) => state.totalUser.status);
  const error = useSelector((state) => state.totalUser.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTotalUsers());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <Link to="/user-management/update"> {/* Link bileşeni eklendi */}
        <Card className="total-product-card">
          <CardBody>
            <CardTitle tag="h5">Total Users</CardTitle>
            <CardText className="total-count">{totalUsers}</CardText>
          </CardBody>
        </Card>
      </Link>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <div className="total-product-container">{content}</div>;
};

export default TotalUser;
