import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom'; // Link bileşeni eklendi
import { fetchTotalCategories } from '../redux/totalCategorySlice';
import '../Css/TotalCard.css';

const TotalCategory = () => {
  const dispatch = useDispatch();
  const totalCategories = useSelector((state) => state.totalCategory.total);
  const status = useSelector((state) => state.totalCategory.status);
  const error = useSelector((state) => state.totalCategory.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTotalCategories());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <Link to="/category-management/update"> {/* Link bileşeni eklendi */}
        <Card className="total-product-card">
          <CardBody>
            <CardTitle tag="h5">Total Categories</CardTitle>
            <CardText className="total-count">{totalCategories}</CardText>
          </CardBody>
        </Card>
      </Link>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <div className="total-product-container">{content}</div>;
};

export default TotalCategory;
