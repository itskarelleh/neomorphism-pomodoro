import React from 'react';
import TimerButton from '../inputs/TimerButton';
import { FaMinus, FaPlus } from "react-icons/fa";

//formats the time to double digits for minutes and seconds
const doubleDigitFormatting = (num) => {
    return num > 9 ? num : `0${num}`;
}

//gets the total minutes and seconds remaining 
//as the timer is counting down
const formatTime = (time) => {
    
    const minutes = doubleDigitFormatting(Math.floor(time / 60));
    const seconds = doubleDigitFormatting(Math.floor(time % 60));
    
    return `${minutes}:${seconds}`;
}
                
export default function TimerDisplay({ time, setTime, sessionType }) {

    const increase = () => {
        if(sessionType !== "Break") {
            if(time === 60) {
                return time;
            } else {
                setTime(time += 5);
            }
        } else {
            if(time === 15) {
                return time;
            } else {
                setTime(time += 5);
            }
        }
    }

    const decrease = () => {
        if(sessionType !== "Break") {
            if(time === 15) {
                return time;
            } else {
                setTime(time -= 5);
            }
        } else {
            if(time === 5) {
                return time;
            } else {
                setTime(time -= 5);
            }
        } 
    }

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