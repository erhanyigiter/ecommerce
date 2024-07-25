import { Container, Row, Col } from 'reactstrap';
import TotalProduct from '../components/TotalProduct'; // TotalProduct bileşenini içe aktar

const Dashboard = () => {


  return (
    <Container>
        <h2>Dashboard</h2>
      <Row>
        <Col md="4">
          <TotalProduct />
        </Col>
        <Col md="4">
          <TotalProduct />
        </Col>
        <Col md="4">
          <TotalProduct />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
