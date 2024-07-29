import { Container, Row, Col } from 'reactstrap';
import TotalProduct from '../components/TotalProduct'; // TotalProduct bileşenini içe aktar
import TotalCategory from '../components/TotalCategory';
import TotalUser from '../components/TotalUser';
import TotalOrders from '../components/TotalOrders';

const Dashboard = () => {


  return (
    <Container>
        <h2>Services</h2>
      <Row>
        <Col md="3">
          <TotalCategory />
        </Col>
        <Col md="3">
          <TotalProduct />
        </Col>
        <Col md="3">
          <TotalUser/>
        </Col>
        <Col md="3">
          <TotalOrders/> 
        </Col>
      </Row>
      <h3></h3>
    </Container>
  );
};

export default Dashboard;
