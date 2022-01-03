import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { presetListItems } from '../../enums';
import useLocalStorage from 'hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import './lists.scss';


// const TASKS_NAMESPACE = '95dea73a-491b-4a08-9a0d-16f5b730e0c0';

const rearrangeTasks = (arr, target) => {
    //check if target is last element of the array

    var pos = arr.indexOf(target);
    if(pos == arr[arr.length - 1]) return;

    // var temp;

    do {
        if(arr[pos] === arr[arr.length - 1]) {
            arr[pos] = target;
            break;
        }
        arr[pos] = arr[pos + 1];
        // arr[pos + 1] = null;
        pos++;

    } while(pos < arr.length);

}

const updateTasks = (val, tasks, setTasks) => {
    var newTasks = tasks;
    newTasks.push(val);

    setTasks(JSON.stringify(newTasks));
}

const AddATask = ({ tasks, setTasks, inputVal, setInputVal }) => {
    
    const addNewTask = (val, e) => {
        if(tasks.length == 10) {
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
                <button className="btn-submit"
                type="submit">Add</button>
            </form>
        </>
    )
}

const DeleteButton = ({ label }) => {

    const [ open, setOpen ] = useState(false);

    const handleDelete = () => {
        //asks user if they want to delete the task

        //user confirms 
    }

    return (
        <>
            {open && 
            <div className="popup-bg">
                <div className="popup">
                    <div className="popup-content">
                        <h3>Are you sure you want to delete: </h3>
                        <p>{label}</p>
                    </div>
                </div> 
            </div>}
            <button onClick={() => setOpen(!open)}>
                <FaTrash />
            </button>
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

    const handleInputChange = (e) => setCurrent(prev => ({...prev, label: e.target.value }));

    const updateTask = (e) => {
        var foundTask = tasks.findIndex(x => x.id === current.id);
        tasks[foundTask] = current;

        setTasks(JSON.stringify(tasks));
    }   

    //TODO: delete a task
    const deleteTask = () => {
        // var foundTask = tasks.findIndex(x => x.id === current.id);
        // tasks = tasks.splice(0, foundTask).concat(tasks.slice(-foundTask));
        console.log('Delete task: ' + current.id);
    }

    const toggleTaskComplete = () => {
        setCurrent(prev => ({...prev, isComplete: !isComplete }));
        var foundTask = tasks.findIndex(x => x.id === current.id);
        tasks[foundTask] = current;

        // rearrangeTasks(tasks, current);
        setTasks(JSON.stringify(tasks));
    }

    return (
        <div className="list-item-todo" id={`li-${id}`}>
            <div className="li-content">
                <div className="is-complete">
                    <input name="isComplete" onChange={e => toggleTaskComplete(e)} 
                    checked={current.isComplete}
                    className="checkbox" type="checkbox" />
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
                    <button onClick={deleteTask}>
                        <FaTrash className="raised-icon" />
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
            <AddATask tasks={tasksObj} setTasks={setTasks} 
            inputVal={taskInput} 
            setInputVal={setTaskInput} />
            <div className="tasks-container">
            {tasksObj && tasksObj.map((task) => (
                <ListItem task={task} tasks={tasksObj} setTasks={setTasks}/>
            ))}
            </div>
        </>
    )
}

export { TodoList };