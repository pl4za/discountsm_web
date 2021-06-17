// @flow
import { React, useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button, Card, Figure, OverlayTrigger, Popover } from 'react-bootstrap';
import { GraphUp, GraphDown, Basket, CalendarDate, CalendarPlus } from 'react-bootstrap-icons';
import VotingButtons from './VotingButtons';
import TimeAgo from 'react-timeago'
import { AwesomeButtonProgress } from "react-awesome-button";

function DealCard(props) {
  const { title, description, newPrice, oldPrice, upVotes, downVotes, posted, expiry, link, image } = props.deal;
  const [dealScore, setDealScore] = useState(upVotes + downVotes);

  const openInNewTab = (url) => {
    let win = window.open(url, '_blank');
    win.focus();
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Votes</Popover.Title>
      <Popover.Content>
        <Container>
          <Row as="popover-votes-row">
            <GraphUp className="graph-svg" color="green" />{upVotes} users voted up
          </Row>
          <Row as="popover-votes-row">
            <GraphDown className="graph-svg" color="red" />{downVotes} users voted down
          </Row>
        </Container>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Card as="deal-card">
        <Card.Body as="deal-card-body">
          <Container as="flat-container">
            <Row as="deal-row">
              <Col as="deal-logo-column">
                <Figure as="deal-logo">
                  <Figure.Image
                    thumbnail
                    width={180}
                    height={180}
                    alt="deal_image"
                    src={image} />
                </Figure>
                {/* mobile view */}
                <ButtonGroup className="show-xs-only">
                  <VotingButtons size={"xs"} updateScore={setDealScore} score={upVotes + downVotes} />
                </ButtonGroup>
              </Col>
              <Col xs={8}>
                <Card.Title className="crop-text">{title}</Card.Title>
                <Card.Text>
                  <Container>
                    <Row className="align-items-center">
                      <h4 className="zero-bottom-margin text-success">{newPrice.amount}{newPrice.currency}</h4>/<h5 className="zero-bottom-margin"><del>{oldPrice.amount}{oldPrice.currency}</del></h5>
                    </Row>
                    <Row className="crop-text">{description}</Row>
                  </Container>
                </Card.Text>
              </Col>
              {/* web view */}
              <Col xs="auto" className="show-md-only">
                <ButtonGroup vertical>
                  <VotingButtons size={"md"} updateScore={setDealScore} score={upVotes + downVotes} />
                </ButtonGroup>
              </Col>
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer as="card-footer">
          <Container as="card-footer-container">
            <Row as="container-footer-row">
              {/* web view */}
              <Col xs="auto" className="show-md-only">
                <CalendarDate className="footer-icon-calendar" />
                <TimeAgo date={posted} />
                <CalendarPlus className="footer-icon" /> Expires in <TimeAgo formatter={(value, unit, suffix) => `${value} ${unit}s`} date={expiry} />
                <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={popover}>
                  <GraphUp className="footer-icon graph-svg" color="green" />
                </OverlayTrigger>
                {dealScore} points
              </Col>
              {/* mobile view */}
              <Col xs="auto" className="show-xs-only">
                <CalendarDate className="footer-icon-calendar" /><TimeAgo date={posted} />
                <GraphUp color="green" className="footer-icon" /> {dealScore}
              </Col>
              {/* web view */}
              <Col xs="auto" className="show-md-only">
                <AwesomeButtonProgress
                  type="primary"
                  resultLabel="Success!"
                  action={(element, next) => { openInNewTab(link); next(); }}>
                  <Basket className="button-svg" /> Get deal
                </AwesomeButtonProgress>
              </Col>
              {/* mobile view */}
              <Col xs="auto" className="show-xs-only">
                <AwesomeButtonProgress
                  type="primary"
                  resultLabel="Success!"
                  action={(element, next) => { openInNewTab(link); next(); }}>
                  <Basket className="button-svg" />
                </AwesomeButtonProgress>
              </Col>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </>
  );
}

export default DealCard;
