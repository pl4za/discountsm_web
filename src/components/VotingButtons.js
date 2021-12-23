// @flow
import { React, useState } from 'react';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import { AwesomeButton } from "react-awesome-button";
import axios from 'axios';

function VotingButtons(props) {
  const { size, updateScore, score, dealId, userVote } = props;
  const [radioValue, setRadioValue] = useState(userVote);

  const scoreChanged = (dealId, update) => {
    const vote = update === 1 ? "up" : "down";

    axios.put(`http://localhost:8080/api/v1/deal/${dealId}/${vote}-vote`)
      .then(() => {
        setRadioValue(update);
        updateScore(score + update);
      });
  };

  return (
    <>
      <AwesomeButton
        className={`radio-up-${size}`}
        type="primary"
        onPress={() => scoreChanged(dealId, 1)}
        disabled={radioValue === 1}>
        <ArrowUp />
      </AwesomeButton>
      <AwesomeButton
        className={`radio-down-${size}`}
        type="primary"
        onPress={() => scoreChanged(dealId, -1)}
        disabled={radioValue === -1}>
        <ArrowDown />
      </AwesomeButton>
    </>
  );
}

export default VotingButtons;
