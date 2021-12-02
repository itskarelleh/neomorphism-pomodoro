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

// const ResetButton = () => ( 
//     <TimerButton handleChange={resetTimer} label="Reset">
//         <FaUndoAlt />
//     </TimerButton> 
// );

// const TimerRunningControls = ({ stop, play, running }) => (
//     <div className="timer-controls">
//         <TimerButton handleChange={stopTimer} label="Stop"><FaStop /></TimerButton>
//         <TimerButton handleChange={togglePausePlay} label="Pause">{running ? ( <FaPause /> ) : ( <FaPlay /> )}</TimerButton>
//         <ResetButton />
//     </div>
// );

// const InitialControls = ({ sessionType }) => (
//     <div className="timer-controls">
//         <TimerButton handleChange={startTimer}
//          label="Start"><FaPlay /></TimerButton> 
//         {sessionType === sessionTimes[1].type ? (
//             <ResetButton />
//         ): null}
//     </div>
// )

export { InitialControls, TimerRunningControls };