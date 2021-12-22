import React, { useState, useEffect } from 'react';
import TimerDisplay from './displays/TimerDisplay';
import AudioButton from './inputs/AudioButton';
import { InitialControls, TimerRunningControls } from './inputs/ButtonGroups';
import { sessionTimes } from '../enums';

export default function Pomodoro() {

    const [ timerInterval, setTimerInterval ] = useState(null);
    const [ running, setRunning ] = useState(false);
    const [ time, setTime ] = useState(sessionTimes[0].default);
    const [ sessionType, setSessionType ] = useState(null);
    const [ sound, setSound ] = useState('');
    // const [ audio ] = useState(new Audio())
    var audio = new Audio(sound);
    
    audio.load();

    const startTimer = () => {
        setRunning(true);
        setTimerInterval(setInterval(tick, 1000));
        audio.play();
        if(!sessionType) { 
            setTime(prev => time > 0 ? (prev * 60) : sessionTimes[0].default);
        } else {
            setTime(prev => prev);
        }
        setSessionType(prev => !prev ? sessionTimes[0].type : prev);
    }

    const stopSound = () => {
        setSound('');
        audio.src = '';
        audio.pause();
        audio.currentTime = 0;
    }

    const stopTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setRunning(false);
        audio.src = '';
        audio.currentTime = 0;
        setSound('');

        if(time === 0 && sessionType === sessionTimes[0].type) {
            setTime(5);
            setSessionType(sessionTimes[1].type);
        } else {
            setTime(25);
            setSessionType(null);
        }
    }

    const pauseTimer = () => {
        audio.pause();
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

    const toggleSound = () => {
    }

    useEffect(() => {
        if(audio.currentTime === 0 && time > 0) {
            audio.loop = true;
        }
 
        if(time === 0) {
            stopTimer();
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
                    <AudioButton sound={sound} setSound={setSound} />
                </div>
           </div>
        </>   
    )
}