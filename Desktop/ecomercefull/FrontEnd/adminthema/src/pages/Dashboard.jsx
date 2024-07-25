import { Container, Row, Col } from 'reactstrap';
import TotalProduct from '../components/TotalProduct'; // TotalProduct bileşenini içe aktar

const Dashboard = () => {

  console.log('Dashboard rendered');

  return (
    <Container>
      <h1>Dashboard</h1> {/* Basit bir JSX eklendi */}
      <Row>
        <Col>

        </Col>
      </Row>
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
