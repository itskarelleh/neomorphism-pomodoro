import React, { useState } from 'react';
import { CheckBox } from '../inputs';
import { FaPen, FaTrash } from 'react-icons/fa';
import { presetListItems } from '../../enums';
import useLocalStorage from 'hooks/useLocalStorage';
import useSound from 'use-sound';
import Pop from 'assets/pop.mp3';
import { v4 as uuidv4 } from 'uuid';
import './lists.scss';
import Popup from '../popup';

const updateTasks = (val, tasks, setTasks) => {
    var newTasks = tasks;
    newTasks.push(val);

    setTasks(JSON.stringify(newTasks));
}

const AddATask = ({ tasks, setTasks, inputVal, setInputVal }) => {
    
    const [ play ] = useSound(Pop);
    
    const addNewTask = (val, e) => {
        if(tasks.length === 10) {
            alert("To add more tasks, sign up");
        } else {
            e.preventDefault();

            var newTask = {
                id: uuidv4(val),
                createdAt: Date.now(),
                label: val,
                isComplete: false
            };
            
            updateTasks(newTask, tasks, setTasks);

            console.log(tasks);
            setInputVal("");
        }
    }

    return (
        <>
            <form className="task-add" action="" 
            onSubmit={e => {
                    if(inputVal !== "") addNewTask(inputVal, e);
                }}>
                <input value={inputVal} onChange={e => setInputVal(e.target.value)} 
                className="task-input" type="text" placeholder="I want to..." />
                <button onClick={play} className="btn-submit"
                type="submit">Add</button>
            </form>
        </>
    )
}

const ListItem = ({ task, tasks, setTasks }) => {
    const { id, label, isComplete } = task;
    const [ open, setOpen ] = useState(false);

    const [ current, setCurrent ] = useState({
        id: id,
        label: label,
        isComplete: isComplete
    });

    const toggleOpen = () => setOpen(!open);


    const updateTask = (e) => {
        var foundTask = tasks.findIndex(x => x.id === current.id);
        tasks[foundTask] = current;

        setTasks(JSON.stringify(tasks));
    }   


    const toggleTaskComplete = () => {
        setCurrent(prev => ({...prev, isComplete: !isComplete }));
        var foundTask = tasks.findIndex(x => x.id === current.id);
        tasks[foundTask] = current;

        tasks.push(tasks.splice(foundTask, 1)[0]);
        setTasks(JSON.stringify(tasks));
    }

    return (
        <div className="list-item-todo" id={`li-${id}`}>
            <div className="li-content">
                <div className="is-complete">
                    <CheckBox name="isComplete" 
                    onChange={e => toggleTaskComplete(e)} 
                    checked={current.isComplete} />
                </div>
                <div className="list-item-label">
                    {open ? 
                    <input className="task-input" id={`input-${id}`} type="text" 
                    value={current.label} onChange={e => updateTask(e)} /> 
                    : 
                    <p className={current.isComplete ? "task-complete" : "task-label"} style={current.isComplete ? {textDecoration: "line-through"} : null}>
                        {current.label}
                    </p>}
                </div>
                <div className="edit-btn">
                    <button onClick={toggleOpen}>
                        <FaPen className="raised-icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

const TodoList = () => {

    const [ tasks, setTasks ] = useLocalStorage("tasks", JSON.stringify(presetListItems));
    const [ taskInput, setTaskInput ] = useState("");

    let tasksObj = JSON.parse(tasks);

    return (
        <>
            <div className="tasks-head">
                <h2 className="menu-tab-header raised-text">Tasks</h2>
                <AddATask tasks={tasksObj} setTasks={setTasks} 
                inputVal={taskInput} setInputVal={setTaskInput} />
            </div>
            <div className="tasks-container">
            {tasksObj && tasksObj.map((task, index) => (
                <ListItem key={index} task={task} tasks={tasksObj} setTasks={setTasks}/>
            ))}
            </div>
        </>
    )
}

export { TodoList };