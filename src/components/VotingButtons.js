// @flow
import { React, useState } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

function VotingButtons(props) {
  const { size, updateScore } = props;
  const [radioValue, setRadioValue] = useState(0);

  return (
    <>
      <ToggleButton
        key="vote-up"
        id={`radio-up-${size}`}
        type="radio"
        variant="outline-success"
        name="radio"
        value={1}
        checked={radioValue === 1}
        onChange={e => {
          setRadioValue(1);
          updateScore(1);
        }}>
        <ArrowUp />
      </ToggleButton>
      <ToggleButton
        key="vote-down"
        id={`radio-down-${size}`}
        type="radio"
        variant="outline-danger"
        name="radio"
        value={-1}
        checked={radioValue === -1}
        onChange={e => {
          setRadioValue(-1);
          updateScore(-1);
        }}>
        <ArrowDown />
      </ToggleButton>
    </>
  );
}

export default VotingButtons;
