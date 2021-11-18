import React, { useState, useEffect } from 'react';
import TimerDisplay from './displays/TimerDisplay';
import TimerButton from './inputs/TimerButton';
import { FaUndoAlt, FaPause, FaPlay, FaStop } from "react-icons/fa";

export default function Pomodoro() {

    const sounds = ["Nature", "Fire", "Ticking"];
    const sessionTypes = ["Start", "Running", "Break"];

    const [ timerInterval, setTimerInterval ] = useState(null);
    const [ running, setRunning ] = useState(false);
    const [ time, setTime ] = useState(25);
    const [ sessionType, setSessionType ] = useState(sessionTypes[0]);
    const [ sound, setSound ] = useState(JSON.parse(window.localStorage.getItem('pomo-sound')) || true);
    
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    const startTimer = () => {
        setRunning(true);
        setTimerInterval(setInterval(tick, 1000));
        setTime(previousValue => time > 0 ? (previousValue * 60) : 1500);
        setSessionType(sessionTypes[1]);
    }

    const stopInterval = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setRunning(false);
        setSessionType(sessionTypes[0]);
        setTime(25);
    }

    const pauseTimer = () => setTimerInterval(timerInterval ? stopInterval() : startTimer());
    
    const resetTimer = () => {
        stopInterval();
        setTime(25);
        setRunning(false);
    }

    const tick = () => {
        if(time <= 1) {
            stopInterval();
            setRunning(false);
        }
        setTime(previousValue => previousValue - 1);
    }

    const TimerRunningControls = () => (
        <div className="timer-controls">
            <TimerButton handleChange={stopInterval} label="Stop"><FaStop /></TimerButton>
            <TimerButton handleChange={pauseTimer} label="Pause"><FaPause /></TimerButton>
            <TimerButton handleChange={resetTimer} label="Reset"><FaUndoAlt /></TimerButton>
        </div>
    );

    const InitialControls = () => (
        <div className="timer-controls">
            <TimerButton shape="circle" handleChange={startTimer} label="Start"><FaPlay /></TimerButton> 
        </div>
    )

    return (
        <div className="container">
           <div className="timer">
           <TimerDisplay time={time} setTime={setTime}
            sessionType={sessionType}
            isRunning={running} />
           </div>
           <div className="controls">
               {running ? <TimerRunningControls /> : <InitialControls />}
           </div>
           <div className="settings">
           </div>
        </div>
    )
}