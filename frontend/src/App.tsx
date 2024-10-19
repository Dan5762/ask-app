import React, { useState } from 'react';
import './App.css'; // Change this line if it was './index.css'
import SignInPage from './components/SignInPage';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import axios from 'axios';

interface Comment {
  text: string;
  children: Comment[];
  expanded: boolean
}

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Comment[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);

  const handleSearch = async (query: string) => {
    const response = await axios.post<string[]>('http://localhost:5000/generate', { query });
    const comments: Comment[] = response.data.map(text => ({
      text,
      children: [],
      expanded: false
    }));
  
    setSearchQuery(query);
    setSearchResults(comments);
    setShowResults(true);
    console.log(response.data);
  };

  const handlePassword = async (password: string) => {
    try {
      console.log('Password:', password);
      const response = await axios.post<string>('http://localhost:5000/login', { password });
      if (response.status === 200) {
        setAuthenticated(true);
        console.log('User authenticated');
        return true;
      } else {
        setAuthenticated(false);
        console.log('User not authenticated');
        return false;
      }
    } catch (error) {
      console.error('Error making POST request:', error);
      return false;
    }
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
            />
          ) : (
            <SearchPage onSearch={handleSearch} />
        )
        ) : (
          <SignInPage onAuthenticate={handlePassword} />
        )}
      </main>
      <footer className="p-4 text-center">
        <p><a href="https://daniellong.co">&copy; 2024 Daniel Long</a></p>
      </footer>
    </div>
  );
}

export default App;