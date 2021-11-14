import React, { useState } from 'react';


//3 sessions (initial session, working session, break session)

//set minutes for timer
//play sound once timer is complete
//move to a break session

function Timer(minutes) {
    const [ value, setValue ] = useState(minutes);

    return (
        <>
            {value}
            <button>Start</button>
            <button>Settings</button>
            <button>Sounds</button>
        </>
    )
}

export default Timer;