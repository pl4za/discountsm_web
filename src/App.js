// @flow
import { React, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import DealCard from './components/DealCard';
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { AwesomeButton } from "react-awesome-button";
import { Google } from 'react-bootstrap-icons';
import {reactLocalStorage} from 'reactjs-localstorage';

import 'react-awesome-button/dist/themes/theme-blue.css';
import './App.scss';

function App() {
  const clientId = '28404597374-8qv4b00mmc2ur41mrqs7n5rcdekt7v2p.apps.googleusercontent.com';
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loginGoogle = (response) => {
    const token = response.getAuthResponse().id_token;
    const headers = {
      'Authorization': token
    };
    axios.put(`http://localhost:8080/users/auth/google`, undefined, { headers })
      .then(res => res.data)
      .then(userId => {
        console.log("LOGGED IN AS " + userId);
        reactLocalStorage.set("userId", userId);
        reactLocalStorage.set("userToken", token);
      });
  }

  const logout = () => {
    reactLocalStorage.clear();
    const userId = reactLocalStorage.get("userId");
    console.log("LOGGED IN AS " + userId);
  }

  useEffect(() => {
    const userId = reactLocalStorage.get("userId");
    console.log("LOGGED IN AS " + userId);
    userId === undefined ?
      axios.get(`http://localhost:8080/deals`)
        .then(res => res.data)
        .then(data => {
          setDeals(data);
          setIsLoading(false);
        }).catch(console.log) :
      axios.get(`http://localhost:8080/deals/users/${userId}`)
        .then(res => res.data)
        .then(data => {
          setDeals(data);
          setIsLoading(false);
        }).catch(console.log)
  }, []
  );

  return (
    <>
      {isLoading && <Spinner as="main-spinner" />}

      <Container fluid>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={loginGoogle}
          onFailure={error => console.log(error)}
          render={renderProps =>
            <AwesomeButton type="primary" onPress={() => renderProps.onClick()} disabled={renderProps.disabled}><Google /></AwesomeButton>
          }
        />
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={logout}
          render={renderProps =>
            <AwesomeButton type="secondary" onPress={() => renderProps.onClick()} disabled={renderProps.disabled}><Google /></AwesomeButton>
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
