// @flow
import { React, useEffect, useState } from 'react';
import { Container, Spinner, Navbar, Nav, Image } from 'react-bootstrap';
import DealCard from './components/DealCard';
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { AwesomeButton } from "react-awesome-button";
import { Google } from 'react-bootstrap-icons';
import { reactLocalStorage } from 'reactjs-localstorage';
import { googleClientId } from './Properties';
import logo from './logo.svg';
import 'react-awesome-button/dist/themes/theme-blue.css';
import './App.scss';

function App() {
  const [deals, setDeals] = useState([]);
  const [userId, setUserId] = useState(reactLocalStorage.get("userId"));
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
        setUserId(userId);
      });
  }

  const logout = () => {
    reactLocalStorage.clear();
    setUserId(undefined);
  }

  useEffect(() => {
    const getDeals = () => {
      setIsLoading(true);
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
    }
    getDeals();
  }, [userId]);

  return (
    <>
      {isLoading && <Spinner as="main-spinner" />}
      <Navbar className="main-nav-bar" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">
            <Image className="nav-bar-logo" src={logo} rounded /> Discountsm</Navbar.Brand>
          <Nav className="me-auto">
            {userId === undefined ?
              <GoogleLogin
                clientId={googleClientId}
                buttonText="Login"
                onSuccess={loginGoogle}
                onFailure={error => console.log(error)}
                render={renderProps =>
                  <AwesomeButton type="primary" onPress={() => renderProps.onClick()} disabled={renderProps.disabled}><Google /></AwesomeButton>
                }
              /> :
              <GoogleLogout
                clientId={googleClientId}
                buttonText="Logout"
                onLogoutSuccess={logout}
                render={renderProps =>
                  <AwesomeButton type="secondary" onPress={() => renderProps.onClick()} disabled={renderProps.disabled}><Google /></AwesomeButton>
                }
              />}
          </Nav>
        </Container>
      </Navbar>

      <Container fluid>
        {deals.map(deal => <DealCard key={deal.dealEntity.id + "_user_vote_" + deal.userVote} deal={deal} />)}
      </Container>
    </>
  );
}

export default App;
