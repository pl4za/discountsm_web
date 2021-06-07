// @flow
import React from 'react';
import logo from './logo.svg';
import { Container, Row, Col, Nav, Image, ListGroup } from 'react-bootstrap';

import "bootswatch/dist/superhero/bootstrap.min.css"
import './App.css';
import './App.scss';

function App() {
  return (
    <Container fluid="sd">
      <Row>
        <Col xs={1}><Image src={logo} rounded /></Col>
        <Col className="d-flex align-items-center">
        <Nav defaultActiveKey="/home" as="ul">
          <Nav.Item as="li">
            <Nav.Link href="/home">All</Nav.Link>
          </Nav.Item>
        </Nav>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Nav className="justify-content-center pagination" as="ul">
          <Nav.Item className="page-item disabled" as="li">
            <Nav.Link className="page-link" href="#">&laquo;</Nav.Link>
          </Nav.Item>
          <Nav.Item className="page-item active" as="li">
            <Nav.Link className="page-link" href="#">1</Nav.Link>
          </Nav.Item>
          <Nav.Item className="page-item" as="li">
            <Nav.Link className="page-link" href="#">&raquo;</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
    </Container>
  );
}

export default App;
