// @flow
import { React, useEffect, useState } from 'react';
import { Container, Spinner, Navbar, Image } from 'react-bootstrap';
import DealCard from './components/DealCard';
import axios from 'axios';
import logo from './logo.svg';
import 'react-awesome-button/dist/themes/theme-blue.css';
import './App.scss';

function App() {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDeals = () => {
      setIsLoading(true);
      axios.get(`http://localhost:8080/api/v1/deal`)
        .then(res => res.data)
        .then(data => {
          setDeals(data);
          setIsLoading(false);
        }).catch(console.log)
    }
    getDeals();
  }, []);

  return (
    <>
      {isLoading && <Spinner as="main-spinner" />}
      <Navbar className="main-nav-bar" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">
            <Image className="nav-bar-logo" src={logo} rounded />Discountsm</Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid>
        {deals.map(deal => <DealCard key={deal.id} deal={deal} />)}
      </Container>
    </>
  );
}

export default App;
