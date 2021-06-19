// @flow
import { React, useState } from 'react';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import { AwesomeButton } from "react-awesome-button";
import axios from 'axios';

function VotingButtons(props) {
  const { size, updateScore, score, dealId } = props;
  const [radioValue, setRadioValue] = useState(0);

  const scoreChanged = (dealId, update, userId) => {
    const vote = update === 1 ? "up" : "down";

    axios.put(`http://localhost:8080/deals/${dealId}/user/${userId}/${vote}-vote`)
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
        onPress={() => scoreChanged(dealId, 1, "b231927b-1be3-4743-9f0d-044519abf602")}
        disabled={radioValue === 1}>
        <ArrowUp />
      </AwesomeButton>
      <AwesomeButton
        className={`radio-down-${size}`}
        type="primary"
        onPress={() => scoreChanged(dealId, -1, "b231927b-1be3-4743-9f0d-044519abf602")}
        disabled={radioValue === -1}>
        <ArrowDown />
      </AwesomeButton>
    </>
  );
}

export default VotingButtons;
