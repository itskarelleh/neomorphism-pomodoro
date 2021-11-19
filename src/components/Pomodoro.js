import React, { useState, useEffect } from 'react';
import TimerDisplay from './displays/TimerDisplay';
import TimerButton from './inputs/TimerButton';
import Sounds from './inputs/Sounds';
import { FaUndoAlt, FaPause, FaPlay, FaStop } from "react-icons/fa";

export default function Pomodoro() {
    
    const sessionTimes = [
        { type: "Running", min: 15, default:25, max: 60 },
        { type: "Break", min: 5, default: 5, max: 15 }
    ];
    
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
        // if(!timerInterval){
            // setTimerInterval(setInterval(tick, 1000));
            clearInterval(timerInterval);
            setRunning(false);
            setTime(prev => time > 0 ? (prev) : sessionTimes[0].default);
            // console.log(time);
            // startTimer();
        // } else {
        //     clearInterval(timerInterval);
        //     console.log(time);
        // }
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
        if(time <= 1) {
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

    const ResetButton = () => ( 
        <TimerButton handleChange={resetTimer} label="Reset">
            <FaUndoAlt />
        </TimerButton> );

    const TimerRunningControls = () => (
        <div className="timer-controls">
            <TimerButton handleChange={stopTimer} label="Stop"><FaStop /></TimerButton>
            <TimerButton handleChange={togglePausePlay} label="Pause">{running ? ( <FaPause /> ) : ( <FaPlay /> )}</TimerButton>
            <ResetButton />
        </div>
    );

    const InitialControls = () => (
        <div className="timer-controls">
            <TimerButton handleChange={startTimer}
             label="Start"><FaPlay /></TimerButton> 
            {sessionType === sessionTimes[1].type ? (
                <ResetButton />
            ): null}
        </div>
    )

    useEffect(() => {
        if(time === 0) {
            stopTimer();
        }
    });

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
               {/* <Sounds /> */}
           </div>
        </div>
    )
}