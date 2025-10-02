import React from 'react';

const TodoItem = React.memo(({ todo, toggleComplete, deleteTodo }) => {
    const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

    const itemClasses = [
        'todo-item',
        todo.completed ? 'completed' : '',
        isOverdue ? 'overdue' : ''
    ].join(' ');

    return (
        <li className={itemClasses}>
            <div className="todo-main-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="toggle-complete"
                />
                
                <span className="todo-text">{todo.text}</span>
            </div>

            <div className="todo-details">
                <span className={`todo-category category-${todo.category}`}>
                    {todo.category.toUpperCase()}
                </span>

                {todo.dueDate && (
                    <span className="todo-due-date">
                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </span>
                )}

                <button 
                    onClick={() => deleteTodo(todo.id)} 
                    className="delete-btn"
                    aria-label={`Delete todo: ${todo.text}`}
                >
                    &times;
                </button>
            </div>
        </li>
    );
});

export default TodoItem;