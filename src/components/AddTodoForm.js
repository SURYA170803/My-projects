import React from 'react';
import { useForm } from 'react-hook-form';

const Categories = ['work', 'personal', 'shopping', 'other'];

function AddTodoForm({ addTodo }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        addTodo(data.text, data.category, data.dueDate || null);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="add_todo_form">
            <div className="form_row">
                <div className="form_group">
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        {...register('text', { 
                            required: 'Todo text is required.',
                            minLength: { value: 3, message: 'Must be at least 3 characters.' }
                        })}
                        className={errors.text ? 'input-error' : ''}
                    />
                    {errors.text && <span className="error-message">{errors.text.message}</span>}
                </div>

                <div className="form_group category_select">
                    <select {...register('category')}>
                        {Categories.map(cat => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                        ))}
                    </select>
                </div>

                <div className="form_group date_input">
                    <input
                        type="date"
                        title="Due Date"
                        {...register('dueDate')}
                    />
                </div>

                <button type="submit" className="add-btn">Add Todo</button>
            </div>
        </form>
    );
}

export default AddTodoForm;