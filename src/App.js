// @flow
import React from 'react';
import logo from './logo.svg';
import { Container, Row, Col, Nav, Image, ButtonGroup, Button, Card } from 'react-bootstrap';
import { ArrowUp, ArrowDown, Basket, CalendarDate } from 'react-bootstrap-icons';

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
      {/* deal item 1 */}
      <Container fluid>
        <Row>
          <Card>
            <Card.Body>
              <Container className="zero-padding">
                <Row className="align-items-center justify-content-between">
                  <Col><Image src={logo} /></Col>
                  <Col xs={8}>
                    <Card.Title>Bose® QuietComfort Headphones in Black</Card.Title>
                    <Card.Text>
                      <Container>
                        <Row className="align-items-center">
                          <h3 className="zero-bottom-margin">£11.50</h3> | Boots Deals
                        </Row>
                        <Row>
                          Decent offer. Features - Noise Cancellation - Up to 20 Hours PlaytimeDecent offer. Features - Noise Cancellation - Up to 20 Hours Playtime (Featuring Quick Charge) - Soft Alcantara Fabric Headband - Noise-Rejecting Dual Microphone - Volume
                        </Row>
                      </Container>
                    </Card.Text>
                  </Col>
                  <Col md="auto">
                    <ButtonGroup vertical>
                      <Button><ArrowUp /></Button>
                      <Button><ArrowDown /></Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
            <Card.Footer as="slim-card-footer">
              <Container className="zero-padding">
                <Row className="align-items-center justify-content-between">
                  <Col md="auto">
                    <CalendarDate /> 2 days ago by JasonCosta
                  </Col>
                  <Col md="auto">
                    <Button size="sm"><Basket /> See deal</Button>
                  </Col>
                </Row>
              </Container>
            </Card.Footer>
          </Card>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
