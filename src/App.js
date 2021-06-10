// @flow
import { React, useState } from 'react';
import logo from './logo.svg';
import { Container, Row, Col, Nav, Image, ButtonGroup, Button, Card, Figure, ToggleButton } from 'react-bootstrap';
import { ArrowUp, ArrowDown, Basket, CalendarDate } from 'react-bootstrap-icons';

import './App.scss';

function App() {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: "up", value: '1' },
    { name: "down", value: '-1' },
  ];

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

      {/* deal item */}
      <Card>
        <Card.Body as="deal-card-body">
          <Container as="flat-container">
            <Row as="deal-row">
              <Col as="deal-logo-column">
                <Figure as="deal-logo">
                  <Figure.Image
                    width={180}
                    height={180}
                    alt="deal_image"
                    src={logo} />
                </Figure>
                <ButtonGroup className="show-xs-only">
                  {radios.map((radio, idx) => (
                    <ToggleButton 
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}>
                      {radio.name === "up" ? <ArrowUp /> : <ArrowDown />}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
              <Col xs={8}>
                <Card.Title className="crop-text">Bose® QuietComfort Headphones in Black</Card.Title>
                <Card.Text>
                  <Container>
                    <Row className="align-items-center">
                      <h3 className="zero-bottom-margin">£11.50</h3>| Boots Deals
                    </Row>
                    <Row className="crop-text">
                      Decent offer. Features - Noise Cancellation - Up to 20 Hours Playtime (Featuring Quick Charge) - Soft Alcantara Fabric Headband - Noise-Rejecting Dual Microphone - Volume
                    </Row>
                  </Container>
                </Card.Text>
              </Col>
              <Col xs="auto" className="show-md-only">
                <ButtonGroup vertical>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${radio.name}`}
                      type="radio"
                      variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}>
                      {radio.name === "up" ? <ArrowUp /> : <ArrowDown />}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer as="card-footer">
          <Container as="card-footer-container">
            <Row as="container-footer-row">
              <Col xs="auto">
                <CalendarDate /> 2 days ago by JasonCosta
                  </Col>
              <Col xs="auto">
                <Button size="sm" className="show-md-only"><Basket /> See deal</Button>
                <Button size="sm" className="show-xs-only"><Basket /></Button>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>

    </Container>
  );
}

export default App;
