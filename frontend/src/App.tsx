import React, { useState } from 'react';
import './App.css'; // Change this line if it was './index.css'
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';


interface Result {
  text: string;
  comments: string[];
}


function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Result[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string, results: Result[]) => {
    setSearchQuery(query);
    setSearchResults(results);
    setShowResults(true);
    console.log(results);
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