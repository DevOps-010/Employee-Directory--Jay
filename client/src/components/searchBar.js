import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="form-control"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;