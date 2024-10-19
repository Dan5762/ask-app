import React, { useState } from 'react';
import './App.css';
import SignInPage from './components/SignInPage';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import axios from 'axios';

interface Comment {
  text: string;
  children: Comment[];
  expanded: boolean;
  loaded?: boolean;
}

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Comment[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);

  const handleSearch = async (query: string) => {
    try {
      const response = await axios.post<string[]>('http://localhost:5000/generate', { query });
      
      // Initialize top-level comments
      const comments: Comment[] = response.data.map(text => ({
        text,
        children: [],
        expanded: false,
        loaded: false
      }));

      setSearchQuery(query);
      setSearchResults(comments);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handlePassword = async (password: string) => {
    try {
      const response = await axios.post<string>('http://localhost:5000/login', { password });
      if (response.status === 200) {
        setAuthenticated(true);
        return true;
      }
      setAuthenticated(false);
      return false;
    } catch (error) {
      console.error('Error making POST request:', error);
      return false;
    }
  };

  const updateResults = (newResults: Comment[]) => {
    setSearchResults(newResults);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow flex flex-col">
        {authenticated ? (
          showResults ? (
            <ResultsPage
              query={searchQuery}
              results={searchResults}
              onBack={handleBack}
              onUpdateResults={updateResults}
            />
          ) : (
            <SearchPage onSearch={handleSearch} />
          )
        ) : (
          <SignInPage onAuthenticate={handlePassword} />
        )}
      </main>
      <footer className="p-4 text-center">
        <p><a href="https://daniellong.co">2024 Daniel Long</a></p>
      </footer>
    </div>
  );
}

export default App;