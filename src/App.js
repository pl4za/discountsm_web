// @flow
import { React } from 'react';
import logo from './logo.svg';
import { Container, Row, Col, Nav, Image } from 'react-bootstrap';
import DealCard from './components/DealCard';

import './App.scss';

function App() {

  return (
    <Container fluid>

      {/* header */}
      <Row>
        <Col><Image src={logo} rounded /></Col>
        <Col className="d-flex align-items-center">
          <Nav defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
              <Nav.Link href="/home">All</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <DealCard />
    </Container>
  );
}

export default App;
