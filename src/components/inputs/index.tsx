import React, { useContext, useEffect, useState } from 'react';
import { FaUndoAlt, FaStop, FaPause, FaPlay } from 'react-icons/fa';
import { FaMusic, FaTimes } from "react-icons/fa";
import { soundOptions, sessionTimes } from "../../enums";
import Click from '../../assets/click.mp3';
import PopSound from '../../assets/pop.mp3';
import useSound from 'use-sound';
import './inputs.scss';
import { PomodoroContext } from '../../context/PomodoroProvider';

const Button = ({ label, icon, handleClick, children }) => {
 
    const { running } = useContext(PomodoroContext);
    
    const [ play, exposedData ] = useSound(PopSound);


    useEffect(() => {
        if(running) {
            play();
        }

        if(!running) {
            exposedData.pause();
        }
    }, [])


    return ( 
    <>
        <button className="btn-small" onClick={() => {
            if(running) play();
            handleClick();
        }}>
            <div>
                {icon}
                {label && <p>label</p>}
                {children}
            </div>
        </button>
    </>
    )
}

const TimerButton = ({ handleChange: handleClick, label, icon, children }) => {
    
    const [ play ] = useSound(PopSound);

    return (
        <button onClick={() => { handleClick(); play(); }} 
        className="timer-btn">
            <div className="btn-base">
                {icon && <p>{icon}</p>}
                {label && <p>{label}</p> }
                {children}
            </div>
        </button>
    )
}

const TimerRunningControls = () => {
    
    const { stopTimer, togglePausePlay, resetTimer, running  } = useContext(PomodoroContext);

    return (
        <div className="timer-controls">
            <TimerButton handleChange={stopTimer} label="Stop"><FaStop /></TimerButton>
            <TimerButton handleChange={togglePausePlay} label="Pause">{running ? ( <FaPause /> ) : ( <FaPlay /> )}</TimerButton>
            <TimerButton handleChange={resetTimer} label="Reset"><FaUndoAlt /></TimerButton>
        </div>
    )
};

const InitialControls = () => {
    
    const { sessionType, startTimer, resetTimer } = useContext(PomodoroContext);

    return (
        <div className="timer-controls">
            <TimerButton handleChange={startTimer}
            label="Start"><FaPlay /></TimerButton> 
            {sessionType === sessionTimes[1].type ? (
                <TimerButton handleChange={resetTimer} label="Reset"><FaUndoAlt /></TimerButton>
            ): null}
        </div>
    )
}

const SoundOption = ({ option, resetTimer, ...props }) => {
    
    const { running } = useContext(PomodoroContext);

    const [ play, { stop } ] = useSound(option.audio);
    const [ isActive, setIsActive ] = useState(false);


    const toggleAudio = () => {
        setIsActive(!isActive);
        if(isActive) play();
        if(!isActive) stop();
    }

    useEffect(() =>{
        if(running) play();
        else stop();
    },[running, play, stop])


    return <li onClick={toggleAudio} {...props}>{option.icon}{option.name}</li>;
}

const SoundsList = () => {

    return (
        <ul style={{ marginRight: "15px" }} className="sound-options">
            {soundOptions && soundOptions.map((option,index) => (
                <SoundOption option={option} key={index} role="button"
                id={`sound-${option.name}`} />
            ))}
        </ul>
    )
}

const AudioButton = () => {
    
    const [ open, setOpen ] = useState(false);

    const toggleOpen = () => setOpen(!open);

    return (
        <div className="flex-end">
            {open ?  <SoundsList /> : null }
            <Button handleClick={toggleOpen}>
                {open ? <FaTimes /> : <FaMusic /> }
            </Button>
        </div>
    )
}

const CheckBox = ({ onChange, ...props}) => {

    const [ play ] = useSound(Click);

    return (
        <>
            <input onChange={onChange} onClick={play}
            className="task-check" type="checkbox" {...props} />
        </>
    )
}

const TextInput = ({ buttons, ...props}) => {
    return (
        <div className="">
            <input type="text" {...props} />
            <div className="btn-group">
                {buttons}
            </div>
        </div>
    )
}

export { Button, TimerRunningControls, InitialControls, 
    TimerButton, AudioButton, CheckBox, TextInput }