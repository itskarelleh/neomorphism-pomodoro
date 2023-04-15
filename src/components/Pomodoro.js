import React, { useEffect, useContext } from 'react';
import { TimerDisplay, formatTime } from './timer';
import { AudioButton, InitialControls, TimerRunningControls} from './inputs';
import { PomodoroContext } from '../context/PomodoroProvider';

export default function Pomodoro() {
    const { timerInterval, running, time, sessionType,
    stopTimer, setTime, startTimer, togglePausePlay, resetTimer } = useContext(PomodoroContext);

    useEffect(() => {
        document.title = "Pomodoro";

        if(time === 0) {
            stopTimer();
            document.title = "Pomodoro Finished";
        } else if(sessionType !== null) {
            document.title = "Running: " + formatTime(time);
        }
    });

    return (
        <>
            <div id="timer">
                <TimerDisplay />
                </div>
                <div id="controls">
                { running ? 
                <TimerRunningControls /> 
                    : 
                <InitialControls /> }
                <div className="settings">
                    <AudioButton />
                </div>
            </div>
        </>   
    )
}