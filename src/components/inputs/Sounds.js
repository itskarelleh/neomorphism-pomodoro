import React, { useState, setState } from 'react';
import TimerButton from "./TimerButton";
import { FaMusic, FaTree, FaFire, FaVolumeMute }  from "react-icons/fa";
import FireSound from '../../assets/fire.mp3';
import NatureSound from '../../assets/nature.mp3';
import useSound from 'use-sound';

const sounds = [
    { name: "Nature", icon: FaTree, audio: NatureSound },
    { name: "Fire", icon: FaFire, audio: FireSound },
    { name: "Mute", icon:FaVolumeMute, audio: null }
];

export default function Sounds () {
    //map the sound buttons
    // const [ play, { stop, isPlaying }] = useSound(null);
    const [ open, setOpen ] = useState(true);

    const toggleOpen = setOpen(prev => !prev);

    const SoundsList = () => (
        <>
            <div style={{ display: open ? "block" : "none"}}>
                {sounds && sounds.map((sound) => (
                    <li role="button">
                        <div>
                            {sound.icon}
                            {sound.name}
                        </div>
                    </li>

                ))}
                <li onClick={toggleOpen} role="button"></li>
            </div>
        </>
    )

    return (
        <>
            <SoundsList />
            <TimerButton shape="square" onClick={() => setOpen({ display: 'block' })} 
            label="Sounds">
                <FaMusic />
            </TimerButton>
        </>
    )
}