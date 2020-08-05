import React, { useState, useEffect } from 'react';
import { KeyboardShortcuts, MidiNumbers, Piano as ReactPiano } from 'react-piano';
import SoundfontProvider from './SoundfontProvider';
import { PLAYING, RECORDING } from '../util/constants';
import CircularProgress from "@material-ui/core/CircularProgress";

const DURATION_UNIT = 0.4;
const DEFAULT_NOTE_DURATION = DURATION_UNIT;

// webkitAudioContext fallback needed to support Safari
// const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
    first: MidiNumbers.fromNote('c3'),
    last: MidiNumbers.fromNote('f4'),
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
    const { mode, events, currentTime, currentEvents } = recording;
    const activeNotes = mode === PLAYING
        ? currentEvents.map(event => event.midiNumber)
        : null;

    const onPlayNoteInput = midiNumber => {
        setNotesRecorded(false);
    }

    const onStopNoteInput = (midiNumber, { prevActiveNotes })  => {
        if (notesRecorded === false) {
            recordNotes(prevActiveNotes, noteDuration);
            setNotesRecorded(true);
            setNoteDuration(DEFAULT_NOTE_DURATION);
        }
    }

    const recordNotes = (midiNumbers, duration) => {
        onNotePlayed(midiNumbers);
        if (mode !== RECORDING) {
            return;
        }
        const newEvents = midiNumbers.map(midiNumber => ({
            midiNumber,
            time: currentTime,
            duration
        }));
        setRecording({
            events: events.concat(newEvents),
            currentTime: currentTime + duration,
        });
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
                    noteRange={noteRange}
                    disabled={isLoading}
                    keyboardShortcuts={keyboardShortcuts}
                    setRecording={setRecording}
                    activeNotes={activeNotes}
                />
            )}
        />
    );
}

export default Piano;
