import React, { useState, useEffect } from 'react';
import { KeyboardShortcuts, MidiNumbers, Piano as ReactPiano } from 'react-piano';
import CircularProgress from '@mui/material/CircularProgress';
import SoundfontProvider from './SoundfontProvider';
import { PLAYING, RECORDING } from '../util/constants';

const DURATION_UNIT = 0.4;
const DEFAULT_NOTE_DURATION = DURATION_UNIT;

const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
  first: MidiNumbers.fromNote('c3'),
  last: MidiNumbers.fromNote('b4'),
};

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

const Piano = ({
  recording = {},
  setRecording = () => {},
  onNotePlayed = () => {},
}) => {
  const [noteDuration, setNoteDuration] = useState(DEFAULT_NOTE_DURATION);
  const [notesRecorded, setNotesRecorded] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  // Extract values from props.
  const {
    mode,
    events,
    currentTime,
    currentEvents,
  } = recording;
  // If in recording mode, don't use input.
  const activeNotes = mode === PLAYING
    ? currentEvents.map(({ midiNumber }) => midiNumber)
    : null;

  const onPlayNoteInput = () => {
    setNotesRecorded(false);
  };

  const recordNotes = (midiNumbers, duration) => {
    onNotePlayed(midiNumbers);
    if (mode !== RECORDING) {
      return;
    }
    const newEvents = midiNumbers.map((midiNumber) => ({
      midiNumber,
      time: currentTime,
      duration,
    }));
    setRecording({
      events: events.concat(newEvents),
      currentTime: currentTime + duration,
    });
  };

  const onStopNoteInput = (midiNumber, { prevActiveNotes }) => {
    if (notesRecorded === false) {
      recordNotes(prevActiveNotes, noteDuration);
      setNotesRecorded(true);
      setNoteDuration(DEFAULT_NOTE_DURATION);
    }
  };

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
  }, []);

  if (!audioContext) {
    return <CircularProgress />;
  }

  return (
    <SoundfontProvider
      instrumentName="acoustic_grand_piano"
      audioContext={audioContext}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote }) => (
        <ReactPiano
          playNote={playNote}
          stopNote={stopNote}
          onPlayNoteInput={onPlayNoteInput}
          onStopNoteInput={onStopNoteInput}
          renderNoteLabel={() => {}}
          noteRange={noteRange}
          disabled={isLoading}
          keyboardShortcuts={keyboardShortcuts}
          setRecording={setRecording}
          activeNotes={activeNotes}
        />
      )}
    />
  );
};

export default Piano;
