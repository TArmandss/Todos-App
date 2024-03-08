import React from 'react';
import './Todo.css';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFlag } from 'react-icons/bs';
import { IoIosDoneAll } from 'react-icons/io';

function Todo({
    id,
    text,
    time,
    date,
    displayTodosArray,
    setTodos,
    flaged,
    todos,
    relevantTodos,
    setRelevantTodos,
    setDisplayTodosArray
}) {
    const dateFormated = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateFormated.toLocaleDateString('en-US', options);
    const timeString = time.toString();
    const storedAllTodos = JSON.parse(localStorage.getItem('todos'));
    const storedRelevantTodos = JSON.parse(localStorage.getItem('relevant-todos'));

    const deleteTodo = textToDelete => {
        const updatedTodosRelevant = storedRelevantTodos.filter(todo => todo.text !== textToDelete);
        const updatedAllTodos = storedAllTodos.filter(todo => todo.text !== textToDelete);
        setRelevantTodos(updatedTodosRelevant);
        setTodos(updatedAllTodos);
        localStorage.setItem('todos', JSON.stringify(updatedAllTodos));
        localStorage.setItem('relevant-todos', JSON.stringify(updatedTodosRelevant));
    };

    const completedTask = textToComplete => {
        const updatedCompletedTodos = todos.map(todo =>
            todo.text === textToComplete ? { ...todo, completed: true } : todo
        );
        const updatedRelevantTodos = relevantTodos.filter(todo => todo.text !== textToComplete);

        setTodos(updatedCompletedTodos);
        setRelevantTodos(updatedRelevantTodos);
        localStorage.setItem('todos', JSON.stringify(updatedCompletedTodos));
        localStorage.setItem('relevant-todos', JSON.stringify(updatedRelevantTodos));
    };

    return (
        <div className="todo-box">
            <div className="left-content-item">
                <div className="text-content">
                    <h1>{text}</h1>
                </div>
                <div className="time-content">
                    <h2>{timeString}</h2>
                </div>
                <div className="date-content">
                    <h3>{formattedDate}</h3>
                </div>
                {flaged && (
                    <div className="flaged-content">
                        <BsFlag className="flag-icon" />
                    </div>
                )}
            </div>
            <div className="right-content-item">
                <IoIosDoneAll className="delete-btn" onClick={() => completedTask(text)} />
                <AiOutlineClose className="delete-btn" onClick={() => deleteTodo(text)} />
            </div>
        </div>
    );
}

export default Todo;
