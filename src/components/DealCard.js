// @flow
import { React, useState } from 'react';
import { Container, Row, Col, ButtonGroup, Card, Figure, OverlayTrigger, Popover } from 'react-bootstrap';
import { GraphUp, GraphDown, Basket, CalendarDate, CalendarPlus } from 'react-bootstrap-icons';
import VotingButtons from './VotingButtons';
import TimeAgo from 'react-timeago'
import { AwesomeButtonProgress } from "react-awesome-button";

function DealCard(props) {
  const { id, title, description, newPriceMoney, oldPriceMoney, upVotes, downVotes, posted, expiry, dealLink, imageLink } = props.deal;
  const userVote = props.deal.userVote;
  const [dealScore, setDealScore] = useState(upVotes - downVotes);

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
                    src={imageLink} />
                </Figure>
                {/* mobile view */}
                <ButtonGroup className="show-xs-only">
                  <VotingButtons size={"xs"} updateScore={setDealScore} score={upVotes - downVotes} dealId={id} userVote={userVote} />
                </ButtonGroup>
              </Col>
              <Col xs={8}>
                <Card.Title className="crop-text">{title}</Card.Title>
                <Card.Text as="span">
                  <Container>
                    <Row className="align-items-center">
                      <h4 className="zero-bottom-margin text-success">{newPriceMoney.amount}{newPriceMoney.currencyCode}</h4>
                      /
                      <h5 className="zero-bottom-margin"><del>{oldPriceMoney.amount}{oldPriceMoney.currencyCode}</del></h5>
                    </Row>
                    <Row className="crop-text">{description}</Row>
                  </Container>
                </Card.Text>
              </Col>
              {/* web view */}
              <Col xs="auto" className="show-md-only">
                <ButtonGroup vertical>
                  <VotingButtons size={"md"} updateScore={setDealScore} score={upVotes - downVotes} dealId={id} userVote={userVote} />
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
                <OverlayTrigger trigger={["hover", "focus"]} delay={{ show: 50, hide: 1000 }} placement="right" overlay={popover}>
                  {
                    (dealScore === 0 && <GraphUp className="footer-icon graph-svg" color="blue" />) ||
                    (dealScore > 0 && <GraphUp className="footer-icon graph-svg" color="green" />) ||
                    (dealScore < 0 && <GraphDown className="footer-icon graph-svg" color="red" />)
                  }
                </OverlayTrigger>
                <b className="score-text">{dealScore} points</b>
              </Col>
              {/* mobile view */}
              <Col xs="auto" className="show-xs-only">
                <CalendarDate className="footer-icon-calendar" /><TimeAgo date={posted} />
                <OverlayTrigger trigger={["hover", "focus"]} delay={{ show: 50, hide: 1000 }} placement="right" overlay={popover}>
                  {
                    (dealScore === 0 && <GraphUp color="blue" className="footer-icon" />) ||
                    (dealScore > 0 && <GraphUp color="green" className="footer-icon" />) ||
                    (dealScore < 0 && <GraphDown color="red" className="footer-icon" />)
                  }
                </OverlayTrigger>
                <b className="score-text">{dealScore}</b>
              </Col>
              {/* web view */}
              <Col xs="auto" className="show-md-only">
                <AwesomeButtonProgress
                  type="primary"
                  resultLabel="Success!"
                  action={(element, next) => { openInNewTab(dealLink); next(); }}>
                  <Basket className="button-svg" /> Get deal
                </AwesomeButtonProgress>
              </Col>
              {/* mobile view */}
              <Col xs="auto" className="show-xs-only">
                <AwesomeButtonProgress
                  type="primary"
                  resultLabel="✓"
                  loadingLabel="↑"
                  action={(element, next) => { openInNewTab(dealLink); next(); }}>
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
