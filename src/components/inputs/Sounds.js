import React, { useState, setState } from 'react';
import TimerButton from "./TimerButton";
import { FaMusic }  from "react-icons/fa";

const sounds = [
    { name: "Nature" },
    { name: "Fire" },
    { name: "Ticking" }
];

export const SoundsButton = ({ sound, setSound }) => {

    const [open, setOpen] = useState("");

    const soundOption = (handleEv) => (
        <>
            <div>
                {sounds && sounds.map((sound) => (
                    <button>
                        {sound.name}
                    </button>
                ))}
            </div>
        </>
    )

    const handleOpen = () => {
        alert('Opening soundOption');
    }

    return (
        <>
            <TimerButton shape="square" onClick={soundOption} 
            label="Sounds">
                <FaMusic />
            </TimerButton>
        </>
    )
}