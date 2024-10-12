import React, { useState } from 'react';
import './App.css'; // Change this line if it was './index.css'
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import axios from 'axios';


function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (query: string) => {
    const response = await axios.post<string[]>('http://localhost:5000/strings', { query });
  
    setSearchQuery(query);
    setSearchResults(response.data);
    setShowResults(true);
    console.log(response.data);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow flex flex-col">
        {showResults ? (
          <ResultsPage
            query={searchQuery}
            results={searchResults}
            onBack={handleBack}
          />
        ) : (
          <SearchPage onSearch={handleSearch} />
        )}
      </main>
      <footer className="p-4 text-center">
        <p><a href="https://daniellong.co">&copy; 2024 Daniel Long</a></p>
      </footer>
    </div>
  );
}

export default App;