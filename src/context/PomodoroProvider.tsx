import React, { useState } from 'react';
import { sessionTimes } from '../enums';

type PomodoroContext = {
    timerInterval: unknown,
    running: boolean,
    time: number,
    sessionType: string | null
}

const PomodoroContext = React.createContext<PomodoroContext>({
    timerInterval: null,
    running: false,
    time: sessionTimes[0].default,
    sessionType: null
});

function PomodoroProvider({ children } : { children: React.ReactNode }) {
    const [ timerInterval, setTimerInterval ] = useState<unknown | null>(null);
    const [ running, setRunning ] = useState<boolean>(false);
    const [ time, setTime ] = useState<number>(sessionTimes[0].default);
    const [ sessionType, setSessionType ] = useState<string | null>(null);

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

    const increase = () => {
        if(sessionType !== "Break") {
            if(time === 60) {
                return time;
            } else {
                setTime(prev => prev += 5);
            }
        } else {
            if(time === 15) {
                return time;
            } else {
                setTime(prev => prev += 5);
            }
        }
    }

    const decrease = () => {
        if(sessionType !== "Break") {
            if(time === 15) {
                return time;
            } else {
                setTime(prev => prev -= 5);
            }
        } else {
            if(time === 5) {
                return time;
            } else {
                setTime(prev => prev -= 5);
            }
        } 
    }

    return (
        <PomodoroContext.Provider value={{ timerInterval, time, setTime, running, sessionType, 
        resetTimer, startTimer, togglePausePlay, stopTimer, increase, decrease
         }}>
            {children}
        </PomodoroContext.Provider>
    )


}

export { PomodoroContext, PomodoroProvider }
