// @flow
import { React, useEffect, useState } from 'react';
import { Row, Container, Spinner } from 'react-bootstrap';
import DealCard from './components/DealCard';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { AwesomeButton } from "react-awesome-button";
import { Google } from 'react-bootstrap-icons';

import 'react-awesome-button/dist/themes/theme-blue.css';
import './App.scss';

function App() {

  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const responseGoogle = (response) => {
    console.log(response);
  }

  useEffect(() =>
    axios.get('http://localhost:8080/deals/users/954df33f-25a3-46e5-8375-93a5ffc1eaa4')
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
        <GoogleLogin
          clientId="28404597374-8qv4b00mmc2ur41mrqs7n5rcdekt7v2p.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          isSignedIn={true}
          render={renderProps =>
            <AwesomeButton type="primary" onPress={() => renderProps.onClick()} disabled={renderProps.disabled}><Google /></AwesomeButton>
          }
        />
      </Container>

      <Container fluid>
        {deals.map(deal => <DealCard key={deal.id} deal={deal} />)}
      </Container>
    </>
  );
}

export default App;
