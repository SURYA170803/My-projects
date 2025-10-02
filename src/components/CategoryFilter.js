import React from 'react';

function CategoryFilter({ categories, currentCategory, setFilterCategory }) {
    return (
        <div className="category-filter-container">
            {categories.map(category => (
                <button
                    key={category}
                    className={`category-btn ${currentCategory === category ? 'active' : ''}`}
                    onClick={() => setFilterCategory(category)}
                    aria-pressed={currentCategory === category}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;