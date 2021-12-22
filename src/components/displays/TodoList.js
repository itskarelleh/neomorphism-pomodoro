import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { presetListItems } from '../../enums';

const ListItem =  ({ id, label, setLabel }) => {
    
    const [ open, setOpen ] = useState(false);

    const toggleOpen = () => setOpen(!open);
    const handleInput = (ev) => setLabel(ev.target);

    return (
        <div className="list-item-todo" id={`li-${id}`}>
            <div className="li-content">
                <input type="checkbox" />
                {open ? <input type="text"  /> : <p>{label}</p>}
                <FaPen onClick={toggleOpen}/>
            </div>
        </div>
    )
}


function TodoList() {

    return (
        <>
            {presetListItems && presetListItems.map((item) => (
                <ListItem label={item.label} id={item.id} />
            ))}
        </>
    )
}

export default TodoList;