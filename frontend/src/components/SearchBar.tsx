import React, { useState } from 'react';
import { SearchBarProps } from '../types/base';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (value:string) => {
    setSearchTerm(value)
    onSearch(value);
  };

  return (
    
    <div className="auto-container">
      <div className='input-wrapper'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
