import React from 'react';
import { useSound } from 'use-sound';
import PopSound from 'assets/pop.mp3';


const Button = ({ label, icon, handleClick, children }) => {
 
    const [ play ] = useSound(PopSound);

    return ( 
    <>
        <button className="btn-small" onClick={() => {
            play();
            handleClick();
        }}>
            <div>
                {icon && icon}
                {label && <p>label</p>}
                {children}
            </div>
        </button>
    </>
    )
}

export default Button;