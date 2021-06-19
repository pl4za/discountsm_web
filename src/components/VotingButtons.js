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
        onPress={() => scoreChanged(dealId, 1, "dd59a285-d7b1-4132-b28f-f4ec68c6dabb")}
        disabled={radioValue === 1}>
        <ArrowUp />
      </AwesomeButton>
      <AwesomeButton
        className={`radio-down-${size}`}
        type="primary"
        onPress={() => scoreChanged(dealId, -1, "dd59a285-d7b1-4132-b28f-f4ec68c6dabb")}
        disabled={radioValue === -1}>
        <ArrowDown />
      </AwesomeButton>
    </>
  );
}

export default VotingButtons;
