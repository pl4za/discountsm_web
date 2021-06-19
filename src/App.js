// @flow
import { React, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import DealCard from './components/DealCard';
import axios from 'axios';

import 'react-awesome-button/dist/themes/theme-blue.css';
import './App.scss';

function App() {

  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>
    axios.get('http://localhost:8080/deals')
      .then(res => res.data)
      .then(data => {
        setDeals(data);
        setIsLoading(false);
      })
      .catch(console.log),
    []
  );

  return (
    <>
      {isLoading && <Spinner as="main-spinner" />}
      <Container fluid>
        {deals.map(deal => <DealCard key={deal.id} deal={deal} />)}
      </Container>
    </>
  );
}

export default App;
