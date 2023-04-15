import React, { useContext } from 'react';
import { TimerButton } from '../inputs';
import { FaMinus, FaPlus } from "react-icons/fa";
import "./timer.scss";
import { PomodoroContext } from '../../context/PomodoroProvider';

const doubleDigitFormatting = (num) => {
    return num > 9 ? num : `0${num}`;
}

const formatTime = (time) => {
    
    const minutes = doubleDigitFormatting(Math.floor(time / 60));
    const seconds = doubleDigitFormatting(Math.floor(time % 60));
    
    return `${minutes}:${seconds}`;
}
                
const TimerDisplay = () => {

    const { time, setTime, sessionType, increase, decrease, running } = useContext(PomodoroContext);

    const RunningDisplay = () => (
        <div className="timer-select inline-flex">
            <h2 className="timer-text">{formatTime(time)}</h2>
        </div>
    )

    const InitialDisplay = () => (
        <div className="timer-select inline-flex">
            <TimerButton handleChange={decrease}><FaMinus /></TimerButton> 
            <h2 className="timer-text">{time}</h2>
            <TimerButton handleChange={increase}><FaPlus /></TimerButton>
        </div>
    )

    return (
        <div className="timer-display">
            <div className="timer-container">
                <div className="text-wrap">
                    <h6>{!sessionType ? <>Select minutes</> : sessionType }</h6>
                    {!sessionType ? <InitialDisplay /> : <RunningDisplay />}
                </div>
            </div>
        </div>
    )
}

export { formatTime, TimerDisplay };