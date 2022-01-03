import { useState } from 'react';
import Button from '../inputs/Button';
import { FaTasks, FaTimes } from 'react-icons/fa';
import { TodoList } from '../lists';
import "./menu.scss";

const MenuContainer = ({ handleClick, children }) => (
    <div id="menu">
        <div id="menu-head" className="flex-start">
            <div className="icon"> 
                <FaTimes onClick={handleClick} />
            </div>
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

const Menu = ({ tasks }) => {

    return (
        <header id="header" className="flex-space">
            <h1 id="brand-title">Pomodoro</h1>
            <div>
                <MenuButton icon={<FaTasks />}>
                    <h2 className="menu-tab-header raised-text">Tasks</h2>
                    <TodoList listItems={tasks} />
                </MenuButton>
                {/* <MenuButton icon={<FaCog />}>
                    <h3 className="raised-text">Settings</h3>
                </MenuButton> */}
            </div>
        </header>
    )
}

export { Menu }