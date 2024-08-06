import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import TotalProduct from '../components/TotalProduct';
import TotalCategory from '../components/TotalCategory';
import TotalUser from '../components/TotalUser';
import TotalOrders from '../components/TotalOrders';
import SalesChart from '../components/SalesChart';
import RecentActivities from '../components/RecentActivities';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="flex-grow-1 py-4">
        <h2>Dashboard</h2>
        <Row className="mb-4">
          <Col md="3">
            <TotalCategory />
          </Col>
          <Col md="3">
            <TotalProduct />
          </Col>
          <Col md="3">
            <TotalUser />
          </Col>
          <Col md="3">
            <TotalOrders />
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <SalesChart />
          </Col>
          <Col md="4">
            <RecentActivities />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
