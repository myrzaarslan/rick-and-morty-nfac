import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, value, onChange, onSearch }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div 
      className={`relative flex items-center w-full max-w-xl mx-auto shadow-sm rounded-lg ${
        isFocused 
          ? 'ring-2 ring-indigo-500 dark:ring-green-500' 
          : 'ring-1 ring-gray-300 dark:ring-gray-700'
      } bg-white dark:bg-gray-800 transition-all duration-300`}
    >
      <div className="flex items-center pl-3 text-gray-500 dark:text-gray-400">
        <Search size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-grow px-3 py-3 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
      />
      {value && (
        <button 
          onClick={handleClear}
          className="p-2 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          aria-label="Очистить поиск"
        >
          <X size={16} />
        </button>
      )}
      <button
        onClick={onSearch}
        className="m-1 px-4 py-2 bg-indigo-600 dark:bg-green-500 text-white font-medium rounded-md hover:bg-indigo-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-green-500 transition-colors duration-300"
      >
        Поиск
      </button>
    </div>
  );
};

export default SearchInput;