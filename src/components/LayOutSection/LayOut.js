import React, { useState, useEffect, useReducer } from 'react';
import './LayOut.css';
import APIQuotes from '../APIQuotes/APIQuotes.js';
import Dashboard from './Dashboard';
import Todos from '../Todo/Todos';
import DataVisual from '../DataVisual/DataVisual.jsx';

const initialState = {
    state: '', // You can define an initial value for this property
    status: '',
    allTodos: [],
    flaggedTodos: [],
    todayTodos: []
};

function reducer(state, action) {
    switch (action.type) {
        case 'all-todos':
            return {
                ...state,
                status: 'Selected all todos',
                allTodos: action.payload
            };
        case 'flagged-todos':
            return {
                ...state,
                status: 'Only flagged todos',
                flaggedTodos: action.payload
            };
        case 'todayTodos':
            return {
                ...state,
                status: 'Only relevant todos',
                todayTodos: action.payload
            };
        default:
            return state;
    }
}

function LayOut() {
    const time = new Date();
    const realTime = time.getHours() + ':' + time.getMinutes();
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const [active, setActive] = useState(false);
    const [activeTodos, setActiveTodos] = useState(false);
    const [dataVisual, setDataVisual] = useState(false);
    const [currentTime, setCurrentTime] = useState(realTime);

    const [todos, setTodos] = useState(() => {
        
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        return storedTodos ? storedTodos : [];
    });
    const [relevantTodos, setRelevantTodos] = useState(() => {
        const storedRelevantTodos = JSON.parse(localStorage.getItem('relevant-todos'));
        return storedRelevantTodos ? storedRelevantTodos : [];
    });

    const [{ state, status, allTodos, flaggedTodos, todayTodos }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        let todayTodo = [];
        dispatch({ type: 'all-todos', payload: relevantTodos || [] });

        const flaggedTodos = relevantTodos.filter(todo => todo.flaged);
        dispatch({ type: 'flagged-todos', payload: flaggedTodos });

        const todayTodos = relevantTodos.filter(todo => {
            const todoDate = new Date(todo.date);

            const todoFormattedDate = `${todoDate.getDate()}/${
                todoDate.getMonth() + 1
            }/${todoDate.getFullYear()}`;
            if (todoFormattedDate === date) {
                todayTodo.push(todo);
            } else {
                return;
            }
        });
        dispatch({ type: 'todayTodos', payload: todayTodo });
    }, [relevantTodos]); //HERE HAS TO BE THREE ARGUMENTS , ON BUTTON INDEX, SUBMIT, DELETE

    useEffect(() => {
        const interval = setInterval(() => {
            const newTime = new Date().getHours() + ':' + new Date().getMinutes();
            setCurrentTime(newTime);
        }, 60000);

        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div className="container">
            <div
                className={`${activeTodos || dataVisual ? 'left-content-changed' : 'left-content'}`}
            >
                {/* {active && (
                    <> */}
                {activeTodos ? (
                    <Todos
                        todos={todos}
                        relevantTodos={relevantTodos}
                        setRelevantTodos={setRelevantTodos}
                        setTodos={setTodos}
                        flaggedTodos={flaggedTodos}
                        todayTodos={todayTodos}
                        setActive={setActive}
                        setActiveTodos={setActiveTodos}
                    />
                ) : dataVisual ? (
                    <DataVisual setDataVisual={setDataVisual} />
                ) : (
                    <>
                        <div className="top-row">
                            <div className="greeting-box">
                                <h4>Hi, Armands, Check your daily activities 👋</h4>
                            </div>
                        </div>
                        <div className="mid-row">
                            <div className="todo-app-btn">
                                <button
                                    onClick={() => {
                                        setActiveTodos(true);
                                    }}
                                >
                                    TODO LIST
                                </button>
                            </div>
                            <div className="charts">
                                <button
                                    onClick={() => {
                                        setDataVisual(true);
                                    }}
                                >
                                    CHARTS
                                </button>
                            </div>
                        </div>
                        <div className="bottom-row">
                            <APIQuotes />
                        </div>
                    </>
                )}
            </div>
            <div className="right-content">
                <Dashboard />
            </div>
        </div>
    );
}

export default LayOut;
