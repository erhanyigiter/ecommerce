import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const RecentActivities = () => {
  const activities = [
    'New user registered: fdgdfgfdg',
    'Order #1234 has been shipped',
    'Product "dfsdfs" has been updated',
  ];

  return (
    <div>
      <h3>Recent Activities</h3>
      <ListGroup>
        {activities.map((activity, index) => (
          <ListGroupItem key={index}>{activity}</ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default RecentActivities;
