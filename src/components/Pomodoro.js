import React, { useState, useEffect } from 'react';
import { TimerDisplay, formatTime } from './timer';
import { AudioButton, InitialControls, TimerRunningControls} from './inputs';
import { sessionTimes } from '../enums';

export default function Pomodoro() {

    const [ timerInterval, setTimerInterval ] = useState(null);
    const [ running, setRunning ] = useState(false);
    const [ time, setTime ] = useState(sessionTimes[0].default);
    const [ sessionType, setSessionType ] = useState(null);

    const startTimer = () => {
        setRunning(true);
        setTimerInterval(setInterval(tick, 1000));
        if(!sessionType) { 
            setTime(prev => time > 0 ? (prev * 60) : sessionTimes[0].default);
        } else {
            setTime(prev => prev);
        }
        setSessionType(prev => !prev ? sessionTimes[0].type : prev);
    }

    const stopTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setRunning(false);

        if(time === 0 && sessionType === sessionTimes[0].type) {
            setTime(5);
            setSessionType(sessionTimes[1].type);
        } else {
            setTime(25);
            setSessionType(null);
        }
    }

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setRunning(false);
        setTime(prev => time > 0 ? (prev) : sessionTimes[0].default);
    }

    const togglePausePlay = () => {
        if(running) {
            pauseTimer();
        } else {
            startTimer();
        }
    }
    
    const resetTimer = () => {
        stopTimer();
        setTime(25);
        setRunning(false);
        setSessionType(null);
    }

    const tick = () => {
        if(time <= 0) {
            stopTimer();
            setRunning(false);
            setTime(5);
            try {
                navigator.serviceWorker.register('service-worker.js').then(s => {
                    s.showNotification("Times Up");
                });
            } catch(err) {
                console.log(err);
            } 
            setTimerInterval(sessionTimes[1].type);
        }
        setTime(previousValue => previousValue - 1);
    }

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
           <TimerDisplay time={time} setTime={setTime}
            sessionType={sessionType}
            isRunning={running} />
           </div>
           <div id="controls">
               {running ? <TimerRunningControls stop={stopTimer} 
               play={togglePausePlay} reset={resetTimer} running={running}
                /> : 
                <InitialControls sessionType={sessionType} 
                start={startTimer} reset={resetTimer} />}
               <div className="settings">
                    <AudioButton />
                </div>
           </div>
        </>   
    )
}