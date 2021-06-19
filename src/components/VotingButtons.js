// @flow
import { React, useState } from 'react';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import { AwesomeButton } from "react-awesome-button";
import axios from 'axios';

function VotingButtons(props) {
  const { size, updateScore, score, dealId, userVote } = props;
  const [radioValue, setRadioValue] = useState(userVote);

  const scoreChanged = (dealId, update, userId) => {
    const vote = update === 1 ? "up" : "down";

    axios.put(`http://localhost:8080/deals/${dealId}/users/${userId}/${vote}-vote`)
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
        onPress={() => scoreChanged(dealId, 1, "954df33f-25a3-46e5-8375-93a5ffc1eaa4")}
        disabled={radioValue === 1}>
        <ArrowUp />
      </AwesomeButton>
      <AwesomeButton
        className={`radio-down-${size}`}
        type="primary"
        onPress={() => scoreChanged(dealId, -1, "954df33f-25a3-46e5-8375-93a5ffc1eaa4")}
        disabled={radioValue === -1}>
        <ArrowDown />
      </AwesomeButton>
    </>
  );
}

export default VotingButtons;
