import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { presetListItems } from '../../enums';
import useLocalStorage from 'hooks/useLocalStorage';
import './lists.scss';

const AddATask = ({ tasks, setTasks, inputVal, setInputVal }) => {
    
    const addNewTask = (val, e) => {
        e.preventDefault();

        var newTask = {
            id: (tasks[tasks.length - 1].id) + 1,
            createdAt: Date.now(),
            label: val,
            isComplete: false
        };
        
        var newTasks = tasks;
        newTasks.push(newTask);

        setTasks(JSON.stringify(newTasks));
        setInputVal("");
    }

    return (
        <>
            <form className="task-add" action="" 
            onSubmit={e => {
                    if(inputVal !== "") addNewTask(inputVal, e);
                }}>
                <input value={inputVal} onChange={e => setInputVal(e.target.value)} 
                className="task-input" type="text" placeholder="I want to..." />
                <button className="btn-submit"
                type="submit">Add</button>
            </form>
        </>
    )
}

//TODO: edit a task

//TODO: delete a task

//TODO: Mark a task as complete
const ListItem = ({ id, label, setLabel }) => {
    
    const [ open, setOpen ] = useState(false);

    const toggleOpen = () => setOpen(!open);
    const handleInput = (ev) => setLabel(ev.target);

    return (
        <div className="list-item-todo" id={`li-${id}`}>
            <div className="li-content">
                <div className="is-complete">
                    <input className="checkbox" type="checkbox" />
                </div>
                <div className="list-item-label">
                    {open ? <input className="task-input" 
                    type="text" defaultValue={label}  /> : <p>{label}</p>}
                </div>
                <div className="edit-btn">
                    <button>
                        <FaPen onClick={toggleOpen}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

const TodoList = () => {

    //combine listItems with presets
    const [ tasks, setTasks ] = useLocalStorage("tasks", JSON.stringify(presetListItems));
    // var listItems = {};
    // console.log(typeof tasks);
    const [ taskInput, setTaskInput ] = useState("");

    let tasksObj = JSON.parse(tasks);
    
    // console.log(typeof tasksObj);

    return (
        <>
            <AddATask tasks={tasksObj} setTasks={setTasks} 
            inputVal={taskInput} 
            setInputVal={setTaskInput} />
            {tasksObj && tasksObj.map((task) => (
                <ListItem label={task.label} id={task.id} />
            ))}
        </>
    )
}

export { TodoList };