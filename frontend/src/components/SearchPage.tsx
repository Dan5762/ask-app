import React, { useState } from 'react';
import { Search, CornerDownRight, Check } from 'lucide-react';

interface SearchPageProps {
  onSearch: (query: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiKeySaved, setApiKeySaved] = useState(false);

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

  const handleSaveApiKey = () => {
    // Save the API key logic here
    setApiKeySaved(true);
    console.log('API Key saved:', apiKey);
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
        <div className="h-8"></div>
        <div className="pv-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key"
            className="w-full p-2 pr-10 border rounded-md"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSaveApiKey();
              }
            }}
          />
          <p className="text-sm text-gray-500 mt-2">
            {apiKeySaved ? (
                <>
                <Check size={20} className="inline-block text-green-500" /> API key saved
                </>
            ) : (
              <>
                <CornerDownRight size={20} className="inline-block pr-2" />
                Press Enter to save your API key
              </>
            )}
          </p>
          <div className="h-4"></div>
            <p className="text-sm text-gray-500 mt-2 text-center">
            In order to use this app, you need to have an OpenAI API key. You can get one by signing up at <a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer"><strong>OpenAI</strong></a> and navigating to the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer"><strong>API key tab</strong></a>.
            </p>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;