import React from 'react';
import { MIDI_MAP } from '../util/constants';

const style = {
  display: 'flex',
  justifyContent: 'center',
};

const noteLabel = ({ midiNumber }) => (
  <div style={style}>
    {MIDI_MAP[midiNumber]}
  </div>
);

export default noteLabel;
