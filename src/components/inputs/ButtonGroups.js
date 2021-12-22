import React from 'react';
import TimerButton from './TimerButton';
import { FaUndoAlt, FaStop, FaPause, FaPlay } from 'react-icons/fa';
import { sessionTimes } from '../../enums';

const TimerRunningControls = ({ stop, play, running, reset }) => (
    <div className="timer-controls">
        <TimerButton handleChange={stop} label="Stop"><FaStop /></TimerButton>
        <TimerButton handleChange={play} label="Pause">{running ? ( <FaPause /> ) : ( <FaPlay /> )}</TimerButton>
        <TimerButton handleChange={reset} label="Reset"><FaUndoAlt /></TimerButton>
    </div>
);

const InitialControls = ({ sessionType, start, reset }) => (
    <div className="timer-controls">
        <TimerButton handleChange={start}
         label="Start"><FaPlay /></TimerButton> 
        {sessionType === sessionTimes[1].type ? (
            <TimerButton handleChange={reset} label="Reset"><FaUndoAlt /></TimerButton>
        ): null}
    </div>
)

export { InitialControls, TimerRunningControls };