// @flow
import { React, useEffect, useState } from 'react';
import logo from './logo.svg';
import { Container, Row, Col, Nav, Image } from 'react-bootstrap';
import DealCard from './components/DealCard';

import './App.scss';

function App() {

  const [deals, setDeals] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() =>
    fetch('http://localhost:8080/deals')
      .then(res => res.json())
      .then(data => setDeals(data))
      .catch(console.log),
    []
  );

  return (
    <Container fluid>
      {/* header */}
      <Row>
        <Col className="d-flex align-items-center">
          <Nav defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
              <Nav.Link href="/home">All</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      {deals.map(deal => <DealCard key={deal.id} deal={deal} />)}
    </Container>
  );
}

export default App;
