import React, { useState } from 'react';
import uniq from 'lodash.uniq';
import flatMap from 'lodash.flatmap';
import { PLAYING, RECORDING } from '../util/constants';
import Piano from './Piano';

const Recording = () => {
  const [recording, setRecording] = useState({
    mode: RECORDING,
    events: [],
    currentTime: 0,
    currentEvents: [],
  });
  const scheduledEvents = [];

  const getRecordingEndTime = () => {
    if (recording.events.length === 0) {
      return 0;
    }
    const max = Math.max(
      ...recording.events.map(({ time, duration }) => time + duration),
    );
    return Math.floor(max);
  };

  const setRecordingHelp = (value) => {
    if ('currentTime' in value) {
      let { currentTime } = value;
      currentTime = Math.round(currentTime * 10) / 10;
      // eslint-disable-next-line no-param-reassign
      value.currentTime = currentTime;
    }
    setRecording({ ...recording, ...value });
  };

  const onClickStop = () => {
    scheduledEvents.forEach((scheduledEvent) => clearTimeout(scheduledEvent));
    setRecordingHelp({ mode: RECORDING, currentEvents: [] });
  };

  const onClickPlay = () => {
    setRecordingHelp({ mode: PLAYING });
    const startAndEndTimes = uniq(
      flatMap(recording.events, ({ time, duration }) => [
        time,
        time + duration,
      ]),
    );
    startAndEndTimes.forEach((time) => {
      scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = recording.events.filter(
            (event) => event.time <= time && event.time + event.duration > time,
          );
          setRecordingHelp({
            currentEvents,
            mode: PLAYING,
          });
        }, time * 1000),
      );
    });
    // Stop at the end
    setTimeout(() => {
      onClickStop();
    }, getRecordingEndTime() * 1000);
  };

  const onClickClear = () => {
    onClickStop();
    setRecordingHelp({
      events: [],
      mode: RECORDING,
      currentEvents: [],
      currentTime: 0,
    });
  };

  return (
    <>
      <div id="app">
        <Piano recording={recording} setRecording={setRecordingHelp} />
        <div className="mt-5">
          <button type="button" onClick={onClickPlay}>Play</button>
          <button type="button" onClick={onClickStop}>Stop</button>
          <button type="button" onClick={onClickClear}>Clear</button>
        </div>
        <div className="mt-5">
          <strong>Recorded notes</strong>
        </div>
      </div>
    </>
  );
};

export default Recording;
