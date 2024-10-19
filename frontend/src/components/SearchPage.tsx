import React, { useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

interface SearchPageProps {
  onSearch: (query: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isEmptySearch, setIsEmptySearch] = useState(false);

  const suggestions = [
    "How to cook pasta?",
    "How to drive a manual car?",
    "How to juggle?",
    "Why is Spanish easier to learn than French?"
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') {
      setIsEmptySearch(true);
    } else {
      setIsEmptySearch(false);
      try {
        onSearch(query);
      } catch (error) {
        console.error('Error making POST request:', error);
      }
    }
  };

  const handleSuggestionSearch = async (suggestion: string) => {
    setQuery(suggestion);
    try {
      onSearch(suggestion);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-2xl w-full mx-auto p-4 space-y-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What's on your mind?"
              className={`w-full p-2 pr-10 border rounded-md ${
                isEmptySearch ? 'border-red-500 bg-red-50' : ''
              }`}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
        </form>
        <div className="text-left">
          <h2 className="text-lg font-semibold mb-2">Suggested</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="p-2 border rounded-md text-left hover:bg-gray-100"
                onClick={() => handleSuggestionSearch(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;