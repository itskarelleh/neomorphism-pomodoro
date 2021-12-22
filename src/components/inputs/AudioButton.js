import React, { useState } from 'react';
import Button from './Button';
import { FaMusic, FaTimes } from "react-icons/fa";
import { soundOptions } from "../../enums";

const SoundsList = ({ setSelected }) => {

    return (
        <ul className="sound-options">
            {soundOptions && soundOptions.map((option,index) => (
                <li key={index} role="button"
                onClick={setSelected(option.audio)}
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

export default AudioButton;