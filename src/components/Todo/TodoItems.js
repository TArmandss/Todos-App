import React from 'react'
import './TodoItems.css'
import Todo from './Todo'

 function todoItem({
     displayTodosArray,
     setTodos,
     todos,
     relevantTodos,
     setRelevantTodos,
     setDisplayTodosArray
 }) {
     return (
         <div className="todos-wrapper">
             {displayTodosArray.length === 0 && <p className="empty-list">There are no todos</p>}
             {displayTodosArray.map(todo => (
                 <Todo
                     key={todo.id}
                     text={todo.text}
                     time={todo.time}
                     date={todo.date}
                     displayTodosArray={displayTodosArray}
                     setTodos={setTodos}
                     relevantTodos={relevantTodos}
                     setRelevantTodos={setRelevantTodos}
                     id={todo.id}
                     flaged={todo.flaged}
                     todos={todos}
                     setDisplayTodosArray={setDisplayTodosArray}
                 />
             ))}
         </div>
     );
 }

export default todoItem;