import React from 'react';
import './inputs.scss';
import Click from 'assets/click.mp3';
import useSound from 'use-sound';

export default function Checkbox({ onChange, ...props}) {

    const [ play ] = useSound(Click);

    return (
        <>
            <input onChange={onChange} onClick={play}
            className="task-check" type="checkbox" {...props} />
        </>
    )
}