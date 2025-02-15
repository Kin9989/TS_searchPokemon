import React from 'react';
import './pokemon.css';

interface Props {
  onSearch: (value: string) => void;
  onSort: () => void;
  sortOrder: 'asc' | 'desc';
}

const SearchFilter: React.FC<Props> = ({ onSearch, onSort, sortOrder }) => {
  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Tìm kiếm pokemon..."
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
      <button onClick={onSort} className="sort-button">
        Sắp xếp {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default SearchFilter; 