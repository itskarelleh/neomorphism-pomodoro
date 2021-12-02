import React, { useState, useEffect } from 'react';
import TimerButton from './TimerButton';
import { FaMusic, FaTimes } from "react-icons/fa";
import { soundOptions } from "../../enums";
import useSound from 'use-sound';

const SoundsList = () => {
    
    const [selected, setSelected ] = useState(null);
    const [ play ] = useSound(selected);

    return (
        <ul className="sound-options">
        {soundOptions && soundOptions.map((option) => (
            <li role="button" onClick={play}
            id={`sound-${option.name}`}>
                {option.icon}
                {option.name}
            </li>
        ))}
        </ul>
    )
}

const AudioButton = () => {
    
    const [ open, setOpen ] = useState(false);
    const [ selected, setSelected ] = useState(null);

    const toggleOpen = () => setOpen(!open);

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <TimerButton 
            // isLong={open ? true : false}
            handleChange={toggleOpen}>
                {open ? <FaTimes /> : <FaMusic /> }
            </TimerButton>
            {open ?  <SoundsList setSelected={setSelected} /> : null }
        </div>
    )
}

export default AudioButton;

// return (
//     <>
//         <TimerButton isLong={open ? true : false}
//         handleChange={toggleOpen}>
//             {open ?  
//             <div className="inline-menu">
//             <div>
//                 <FaTimes />
//             </div>
//             <SoundsList sound={sound} />
//             </div>
//             : 
//             <FaMusic /> }
//         </TimerButton>
//     </>
// )