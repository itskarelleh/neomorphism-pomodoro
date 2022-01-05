import React, { useState } from 'react';
import Button from './Button';
import { FaMusic, FaTimes } from "react-icons/fa";
import { soundOptions } from "../../enums";
import useSound from 'use-sound';

const SoundOption = ({ option, ...props }) => {
    
    const [ play, { stop } ] = useSound(option.audio);
    const [ isActive, setIsActive ] = useState(false);

    const toggleAudio = () => {
        setIsActive(!isActive);
        if(isActive) play();
        if(!isActive) stop();
    }
    return <li onClick={toggleAudio} {...props}>{option.icon}{option.name}</li>
}
const SoundsList = () => {

    return (
        <ul className="sound-options">
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

export default AudioButton;