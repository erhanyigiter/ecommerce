import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '14px 0', marginTop: '10px' }}>
      <Container>
        <Row>
          <Col md="6" className="text-center text-md-left">
            <p className="mb-0">© {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
          </Col>
          <Col md="6" className="text-center text-md-right">
            <p className="mb-0">Erhan Yiğit ER</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
