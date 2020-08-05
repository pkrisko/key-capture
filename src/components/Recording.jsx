import React, { useState } from 'react';
import _ from 'lodash';
import { PLAYING, RECORDING } from '../util/constants';
import Piano from './Piano';

const Recording = () => {
    const [recording, setRecording] = useState({
        mode: RECORDING,
        events: [],
        currentTime: 0,
        currentEvents: [],
    });
    let scheduledEvents = [];

    const getRecordingEndTime = () => {
        if (recording.events.length === 0) {
            return 0;
        }
        const max = Math.max(
            ...recording.events.map(({ time, duration }) => time + duration),
        );
        return Math.floor(max);
    };

    const setRecordingHelp = value => {
        if ('currentTime' in value) {
            let { currentTime } = value;
            currentTime = Math.round(currentTime * 10) / 10;
            value.currentTime = currentTime;
        }
        setRecording(Object.assign({}, recording, value));
    }

    const onClickPlay = () => {
        setRecordingHelp({ mode: PLAYING });
        const startAndEndTimes = _.uniq(
            _.flatMap(recording.events, event => [
                event.time,
                event.time + event.duration,
            ]),
        );
        startAndEndTimes.forEach(time => {
            scheduledEvents.push(
                setTimeout(() => {
                    let currentEvents = recording.events.filter(event => {
                        return event.time <= time && event.time + event.duration > time;
                    });
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

    const onClickStop = () => {
        scheduledEvents.forEach(scheduledEvent => {
            clearTimeout(scheduledEvent);
        });
        setRecordingHelp({ mode: RECORDING, currentEvents: [] });
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
                    <button onClick={onClickPlay}>Play</button>
                    <button onClick={onClickStop}>Stop</button>
                    <button onClick={onClickClear}>Clear</button>
                </div>
                <div className="mt-5">
                    <strong>Recorded notes</strong>
                </div>
            </div>
        </>
    );
}

export default Recording;
