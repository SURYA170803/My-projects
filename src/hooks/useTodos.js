import { useState, useCallback, useEffect } from 'react';

const getInitialTodos = () => {
    try {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (e) {
        console.error("Could not load todos from local storage:", e);
        return [];
    }
};

export const useTodos = () => {
    const [todos, setTodos] = useState(getInitialTodos);
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = useCallback((text, category, dueDate) => {
        const newTodo = {
            id: Date.now(), 
            text,
            category: category || 'work', 
            dueDate: dueDate || null,
            completed: false,
        };
        setTodos(prev => [...prev, newTodo]);
    }, []);
    const deleteTodo = useCallback((id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, []);
    const toggleComplete = useCallback((id) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }, []);

    return {
        todos,
        addTodo,
        deleteTodo,
        toggleComplete,
    };
};