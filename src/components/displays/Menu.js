import React, { useState } from 'react';
import Button from '../inputs/Button';
import { FaTasks, FaCog, FaTimes } from 'react-icons/fa';
import TodoList from './TodoList';

const MenuContainer = ({ handleClick, children }) => (
    <div id="menu">
        <div id="menu-head" className="flex-start">
            <div className="icon">
                <FaTimes onClick={handleClick} />
            </div>
            {/* <h1 id="brand-title" style={{ marginLeft: '25px'}}>Pomodoro</h1> */}
        </div>
        <div className="menu-content">
            {children}
        </div>
    </div>
)

const MenuButton = ({ icon, children }) => {
    const [ open, setOpen ] = useState(false);
    const toggleOpen = () => setOpen(!open);

    return (
        <>
        {open && 
        <MenuContainer handleClick={toggleOpen}>
            {children}
        </MenuContainer> }
        <Button handleClick={toggleOpen} icon={icon} />
        </>
    )
}

export default function Menu() {

    return (
        <header id="header" className="flex-space">
            <h1 id="brand-title">Pomodoro</h1>
            <div>
                <MenuButton icon={<FaTasks />}>
                    <h3 className="raised-text">Tasks</h3>
                    <TodoList />
                </MenuButton>
                <MenuButton icon={<FaCog />}>
                    <h3 className="raised-text">Settings</h3>
                </MenuButton>
            </div>
        </header>
    )
}