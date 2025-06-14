import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === 'Return') && input.length >= 3) {
      onSearch(input);
    }
  };

  return (
    <div className="search-bar">
      <input
        placeholder="Search by name or SSN"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={() => input.length >= 3 && onSearch(input)}>🔍</button>
    </div>
  );
};
