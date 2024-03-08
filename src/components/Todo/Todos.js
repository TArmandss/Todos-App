import React, { useState, useEffect, useRef } from 'react';
import './Todos.css';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsFlag } from 'react-icons/bs';
import TodoItems from './TodoItems';
import AlertModule from './AlertModule';

function Todos({
    todos,
    relevantTodos,
    setRelevantTodos,
    setTodos,
    flaggedTodos,
    todayTodos,
    setActive,
    setActiveTodos
}) {
    const [textValue, setTextValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [error, setError] = useState(null);
    const [flagState, setFlagState] = useState(false);
    const textInputValue = useRef(null);

    const buttons = ['All', 'Flagged', 'Scheduled for today'];
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);
    const [displayTodosArray, setDisplayTodosArray] = useState([]);

    useEffect(() => {
        function onFocusingTextInput(e) {
            if (e.code === 'Enter') {
                textInputValue.current.focus();
            }
        }

        document.addEventListener('keydown', onFocusingTextInput);

        return function () {
            document.removeEventListener('keydown', onFocusingTextInput);
        };
    });

    function onActivatedFlagHandler() {
        setFlagState(value => !value);
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('relevant-todos', JSON.stringify(relevantTodos));
    });

    const readTextValueHandler = e => {
        const keyCap = e.target.value;
        setTextValue(keyCap);
    };

    const readTimeValueHandler = e => {
        setTimeValue(e.target.value);
    };

    const readDateValueHandler = e => {
        setDateValue(e.target.value);
    };

    const submitTodo = event => {
        event.preventDefault();

        if (textValue === '' || dateValue === '' || timeValue === '') {
            setError({
                title: 'Invalid input',
                message: 'Please fill up all the forms'
            });
        } else if (textValue && dateValue && timeValue) {
            setTodos(prevTodos => [
                ...prevTodos,
                {
                    text: textValue,
                    time: timeValue,
                    date: new Date(dateValue),
                    id: Math.floor(Math.random() * 10 + 1).toString(),
                    completed: false,
                    flaged: flagState
                }
            ]);
            setRelevantTodos(prevTodos => [
                ...prevTodos,
                {
                    text: textValue,
                    time: timeValue,
                    date: new Date(dateValue),
                    id: Math.floor(Math.random() * 10 + 1).toString(),
                    completed: false,
                    flaged: flagState
                }
            ]);
        }

        setDateValue('');
        setTimeValue('');
        setTextValue('');
        setFlagState(false);
    };

    const errorHandler = () => {
        setError(null);
    };

    useEffect(() => {
        if (activeButtonIndex === 0) {
            setDisplayTodosArray(relevantTodos);
        } else if (activeButtonIndex === 1) {
            setDisplayTodosArray(flaggedTodos);
        } else if (activeButtonIndex === 2) {
            setDisplayTodosArray(todayTodos);
        }
    }, [activeButtonIndex, relevantTodos,todos, flaggedTodos, todayTodos]);

    const handleButtonClick = ({ index }) => {
        setActiveButtonIndex(index);
    };

    return (
        <React.Fragment>
            {error && (
                <AlertModule onConfirm={errorHandler} title={error.title} message={error.message} />
            )}

            <div className="todo">
                <header className="logo-todo">
                    <div className="move-back">
                        <BsArrowLeftShort onClick={() => setActiveTodos(false)} />
                    </div>
                </header>
                <div className="todo_section">
                    <div className="input_section">
                        <form className="form-todo">
                            <div className="cover-input-text">
                                <input
                                    ref={textInputValue}
                                    type="text"
                                    onChange={readTextValueHandler}
                                    onKeyDown={e => {
                                        if (/^[0-9]*$/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    value={textValue}
                                />
                            </div>
                            <div className="cover-input-time">
                                <input
                                    type="time"
                                    onChange={readTimeValueHandler}
                                    value={timeValue}
                                />
                            </div>
                            <div className="cover-input-date">
                                <input
                                    type="date"
                                    onChange={readDateValueHandler}
                                    value={dateValue}
                                />
                            </div>
                        </form>
                        <button
                            className={`flag-btn ${flagState ? 'active' : ' '}`}
                            onClick={onActivatedFlagHandler}
                        >
                            {' '}
                            <BsFlag />{' '}
                        </button>
                        <button className="submit" onClick={submitTodo}>
                            Submit
                        </button>
                    </div>
                    <div className="filter-todos">
                        {buttons.map((button, index) => (
                            <button
                                key={index}
                                className={index === activeButtonIndex ? 'btn-active' : ''}
                                onClick={() => handleButtonClick({ index, button })}
                            >
                                {button}
                            </button>
                        ))}
                    </div>
                    <div className="display_section">
                        <TodoItems
                            displayTodosArray={displayTodosArray}
                            setTodos={setTodos}
                            todos={todos}
                            relevantTodos={relevantTodos}
                            setRelevantTodos={setRelevantTodos}
                            setDisplayTodosArray={setDisplayTodosArray}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Todos;
