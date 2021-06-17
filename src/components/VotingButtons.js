// @flow
import { React, useState } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import { AwesomeButton } from "react-awesome-button";

function VotingButtons(props) {
  const { size, updateScore, score } = props;
  const [radioValue, setRadioValue] = useState(0);

  const scoreChanged = (update) => {
    setRadioValue(update);
    updateScore(score + update);
  };

  return (
    <>
      <AwesomeButton
        className={`radio-up-${size}`}
        type="primary"
        onPress={() => scoreChanged(1)}
        disabled={radioValue === 1}>
        <ArrowUp />
      </AwesomeButton>
      <AwesomeButton
        className={`radio-down-${size}`}
        type="primary"
        onPress={() => scoreChanged(-1)}
        disabled={radioValue === -1}>
        <ArrowDown />
      </AwesomeButton>
    </>
  );
}

export default VotingButtons;
