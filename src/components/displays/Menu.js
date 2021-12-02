import React, { useState } from 'react';
import Button from '../inputs/Button';
import { FaBars, FaTimes } from 'react-icons/fa';

const MenuContainer = ({ handleClick }) => (
    <div id="menu">
        <div id="menu-head" className="flex-start">
        <div className="icon">
            <FaTimes onClick={handleClick} />
        </div>
        <h1 id="brand-title" 
        style={{ marginLeft: '25px'}}>Pomodoro</h1>
        </div>
    </div>
)

export default function Menu() {
    const [ open, setOpen ] = useState(false);
    const toggleOpen = () => setOpen(!open);

    return (
        <header className="flex-end">
            {open && <MenuContainer handleClick={toggleOpen}/> }
            <Button handleClick={toggleOpen}>
                <FaBars />
            </Button>
        </header>
    )
}