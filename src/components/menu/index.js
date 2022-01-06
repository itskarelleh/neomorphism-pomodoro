import { useState } from 'react';
import { Button } from '../inputs';
import { FaTasks, FaTimes } from 'react-icons/fa';
import { TodoList } from '../lists';
import "./menu.scss";

const MenuContainer = ({ handleClick, children }) => (
    <div id="menu">
        <div id="menu-head" className="flex-start">
            <div id="exit" className="icon"> 
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
                    <TodoList listItems={tasks} />
                </MenuButton>
            </div>
        </header>
    )
}

export { Menu }