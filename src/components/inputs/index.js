import React, { useState, useEffect } from 'react';
import { FaUndoAlt, FaStop, FaPause, FaPlay } from 'react-icons/fa';
import { FaMusic, FaTimes } from "react-icons/fa";
import { soundOptions, sessionTimes } from "../../enums";

const Button = ({ label, icon, handleClick, children }) => (
    <>
        <button className="btn-small" onClick={handleClick}>
            <div>
                {icon && icon}
                {label && <p>label</p>}
                {children}
            </div>
        </button>
    </>
)

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

const TimerButton = ({ handleChange, label, icon, children }) => (
    
    <>
    <button onClick={handleChange} 
    className="timer-btn">
        <div className="btn-base">
            {icon && <p>{icon}</p>}
            {label && <p>{label}</p> }
            {children}
        </div>
    </button>
    </>
)

const ToggleSwitch = ({ handleBoolean }) => {

    return (
        <>
            <div className="toggle-switch-container">
                <div className="toggle-bar">
                    
                </div>
            </div>
        </>
    )
}

const SoundsList = ({ setSelected }) => {

    return (
        <ul className="sound-options">
            {soundOptions && soundOptions.map((option,index) => (
                <li key={index} role="button"
                id={`sound-${option.name}`}>
                    {option.icon}
                    {option.name}
                </li>
            ))}
        </ul>
    )
}

const AudioButton = ({ sound, setSound }) => {
    
    const [ open, setOpen ] = useState(false);
    let audioObj = new Audio(sound);

    const toggleOpen = () => setOpen(!open);

    return (
        <div className="flex-end">
            {open ?  <SoundsList setSelected={setSound} audioObj={audioObj} /> : null }
            <Button handleClick={toggleOpen}>
                {open ? <FaTimes /> : <FaMusic /> }
            </Button>
        </div>
    )
}



export { Button, TimerRunningControls, InitialControls, TimerButton, 
    ToggleSwitch, AudioButton }