import React, { useState } from 'react';

function SearchBar({ setSearchQuery }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        setSearchQuery(query); 
    };

    const handleClear = () => {
        setSearchTerm('');
        setSearchQuery('');
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={handleChange}
                className="search-input"
            />
            {searchTerm && (
                <button onClick={handleClear} className="clear-search-btn">
                    &times;
                </button>
            )}
        </div>
    );
}

export default SearchBar;