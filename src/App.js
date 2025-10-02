import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useTodos } from './hooks/useTodos';
import { useTheme } from './context/ThemeContext';
import AddTodoForm from './components/AddTodoForm';
import TodoItem from './components/TodoItem';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import './App.css'; 

const CATEGORIES = ['all', 'work', 'personal', 'shopping', 'other'];

function App() {
    const { todos, addTodo, deleteTodo, toggleComplete } = useTodos();
    const { toggleTheme, theme } = useTheme();

    const [filterStatus, setFilterStatus] = useState('All'); 
    const [filterCategory, setFilterCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const visibleTodos = useMemo(() => {
        let list = todos;
        if (searchQuery) {
            list = list.filter(todo =>
                todo.text.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (filterCategory !== 'all') {
            list = list.filter(todo => todo.category === filterCategory);
        }
        if (filterStatus === 'Active') {
            list = list.filter(todo => !todo.completed);
        } else if (filterStatus === 'Completed') {
            list = list.filter(todo => todo.completed);
        }

        return list;
    }, [todos, searchQuery, filterStatus, filterCategory]); 
    const handleKeyDown = useCallback((event) => {
        if (event.key === 't' && event.ctrlKey) {
            event.preventDefault(); 
            toggleTheme(); 
        }
    }, [toggleTheme]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);


    return (
        <div className={`todo-app-wrapper ${theme}`}>
            <header className="app-header">
                <h1>Enhanced Todo List</h1>
                <button onClick={toggleTheme} className="theme-toggle-btn">
                    {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </header>

            <main className="todo-content">
                <AddTodoForm addTodo={addTodo} />

                <div className="filters-container">
                    <SearchBar setSearchQuery={setSearchQuery} />
                    <CategoryFilter 
                        categories={CATEGORIES}
                        currentCategory={filterCategory}
                        setFilterCategory={setFilterCategory}
                    />
                    <div className="status-filter">
                        <button onClick={() => setFilterStatus('All')} className={filterStatus === 'All' ? 'active' : ''}>All</button>
                        <button onClick={() => setFilterStatus('Active')} className={filterStatus === 'Active' ? 'active' : ''}>Active</button>
                        <button onClick={() => setFilterStatus('Completed')} className={filterStatus === 'Completed' ? 'active' : ''}>Completed</button>
                    </div>
                </div>

                <ul className="todo-list">
                    {visibleTodos.length > 0 ? (
                        visibleTodos.map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                deleteTodo={deleteTodo} 
                                toggleComplete={toggleComplete} 
                            />
                        ))
                    ) : (
                        <p className="empty-state">No todos found. Try adding a new one or adjusting your filters!</p>
                    )}
                </ul>
            </main>

            <footer className="app-footer">
                <p>Developer: [Surya] | <a href="[Your GitHub Project URL]">GitHub Project</a></p>
                <p>Hosted on Netlify: <a href="[Your Netlify Application URL]">[Netlify URL]</a></p>
                <p className="shortcut-hint">💡 **Shortcut:** Press Ctrl+T to toggle Dark/Light mode.</p>
            </footer>
        </div>
    );
}

export default App;