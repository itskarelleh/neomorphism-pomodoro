import React, { useState, useEffect } from 'react';
import TimerDisplay from './displays/TimerDisplay';
import TimerButton from './inputs/TimerButton';
import AudioButton from './inputs/AudioButton';
import { InitialControls, TimerRunningControls } from './inputs/ButtonGroups';

const sessionTimes = [
    { type: "Running", min: 15, default:25, max: 60 },
    { type: "Break", min: 5, default: 5, max: 15 }
];

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
        
        // if(time > 0 && running) {
        //     audio.play();
        // } 
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
               {running ? <TimerRunningControls stop={stopTimer} 
               play={startTimer} reset={resetTimer} running={running}
                /> : 
                <InitialControls sessionType={sessionType} 
                start={startTimer} reset={resetTimer} />}
               <div className="settings">
                    <AudioButton />
                </div>
           </div>
           
        </div>
    )
}