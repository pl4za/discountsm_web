// @flow
import { React, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import DealCard from './components/DealCard';
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { AwesomeButton } from "react-awesome-button";
import { Google } from 'react-bootstrap-icons';
import { ReactSession } from 'react-client-session';

import 'react-awesome-button/dist/themes/theme-blue.css';
import './App.scss';

function App() {
  const clientId = '28404597374-8qv4b00mmc2ur41mrqs7n5rcdekt7v2p.apps.googleusercontent.com';
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loginGoogle = (response) => {
    const token = response.getAuthResponse().id_token;
    axios.put(`http://localhost:8080/users/auth/google`, { token })
      .then(res => res.data)
      .then(userId => {
        ReactSession.setStoreType("localStorage");
        ReactSession.set("userId", userId);
        ReactSession.set("userToken", token);

        axios.get(`http://localhost:8080/deals/users/${userId}`)
          .then(res => res.data)
          .then(data => {
            setDeals(data);
            setIsLoading(false);
          })
          .catch(console.log);
      });
  }

  const logout = () => {
    ReactSession.set("userId", undefined);
    ReactSession.set("userToken", undefined);
  }

  return (
    <>
      {isLoading && <Spinner as="main-spinner" />}

      <Container fluid>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          isSignedIn={true}
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
