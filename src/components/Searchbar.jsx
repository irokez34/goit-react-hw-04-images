import React, { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const handleChange = evt => {
    setQuery(evt.currentTarget.value);
  };
  const handlerSubmit = evt => {
    evt.preventDefault();
    if (!query.trim()) return alert('cannot be empy');
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handlerSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="button-label">Search</span>
        </button>
        <input
          value={query}
          onChange={handleChange}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
