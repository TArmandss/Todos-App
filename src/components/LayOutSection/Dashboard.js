import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { MdDoneAll } from 'react-icons/md';
import { MdPending } from 'react-icons/md';
import { CgCalendarTwo } from 'react-icons/cg';
import { BsFillFlagFill } from 'react-icons/bs';

function Dashboard() {
    const styleIcons = { fontSize: 20, color: '#bcba47' };
    const [pendingTasks, setPendingTasks] = useState();
    const [todayTodos, setTodayTodos] = useState(0);
    const [flaggedTodos, setFlaggedTodos] = useState();
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const todosData = localStorage.getItem('relevant-todos');
    const todos = JSON.parse(todosData);
    const todosLength = localStorage.getItem('todos');
    const todosAll = JSON.parse(todosLength);

// Get the length of the parsed object/array
    
    useEffect(() => {
      
        if (todos) {
            setPendingTasks(todos.length);

            let flaggedCount = 0;
            todos.forEach((todo) => {
                if (todo.flaged) {
                    flaggedCount++;
                }
            });
            setFlaggedTodos(flaggedCount);

            let todayCount = 0;
            todos.forEach((todo) => {
                const todoDate = new Date(todo.date);
                const todoFormattedDate = `${todoDate.getDate()}/${todoDate.getMonth() + 1}/${todoDate.getFullYear()}`;
                if (todoFormattedDate === date) {
                    todayCount++;
                }
            });
            setTodayTodos(todayCount);
        } else {
            setPendingTasks(0);
        }
    }, [todos]);

    return (
        <div className="right-side">
            <div className="profile">
                <div className="paint"></div>
                <div className="picture">
                    <div className="photo"></div>
                </div>
                <h1 className="h7">Joe <br/> Profile</h1>
            </div>
            <div className="stats">
                <div className="status_box">
                    <MdDoneAll style={styleIcons} />
                    <p>{todosAll.length}</p>
                    <h4>Completed Tasks</h4>
                </div>
                <div className="status_box">
                    <MdPending style={styleIcons} />
                    <p>{pendingTasks}</p>
                    <h4>Pending</h4>
                </div>
                <div className="status_box">
                    <CgCalendarTwo style={styleIcons} />
                    <p>{todayTodos}</p>
                    <h4>Today</h4>
                </div>
                <div className="status_box">
                    <BsFillFlagFill style={styleIcons} />
                    <p>{flaggedTodos}</p>
                    <h4>Crucial</h4>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;