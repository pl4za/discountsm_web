// @flow
import { React, useState } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

function VotingButtons(props) {
  const checked = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  return (
    <>
      <ToggleButton
        key="vote-up"
        id={`radio-up-${props.size}`}
        type="radio"
        variant="outline-success"
        name="radio"
        value={1}
        checked={radioValue === 1}
        onChange={e => setRadioValue(1)}>
        <ArrowUp />
      </ToggleButton>
      <ToggleButton
        key="vote-down"
        id={`radio-down-${props.size}`}
        type="radio"
        variant="outline-danger"
        name="radio"
        value={-1}
        checked={radioValue === -1}
        onChange={e => setRadioValue(-1)}>
        <ArrowDown />
      </ToggleButton>
    </>
  );
}

export default VotingButtons;
