import React, { useState } from 'react';
import Button from './Button';
import { FaMusic, FaTimes } from "react-icons/fa";
import { soundOptions } from "../../enums";
import useSound from 'use-sound';
import PropTypes from 'prop-types';


const SoundsList = ({ setSelected }) => {
    
    // const [ selected, setSelected ] = useState(null);
    // const [ play ] = useSound(selected);

    return (
        <ul className="sound-options">
            {soundOptions && soundOptions.map((option) => (
                <li role="button" onClick={setSelected(option.audio)}
                id={`sound-${option.name}`}>
                    {option.icon}
                    {option.name}
                </li>
            ))}
        </ul>
    )
}

const AudioButton = ({ setSound }) => {
    
    const [ open, setOpen ] = useState(false);
    const toggleOpen = () => setOpen(!open);
    return (
        <div className="flex-end">
            {open ?  <SoundsList setSelected={setSound} /> : null }
            <Button handleClick={toggleOpen}>
                {open ? <FaTimes /> : <FaMusic /> }
            </Button>
        </div>
    )
}

export default AudioButton;