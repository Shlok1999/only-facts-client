import React, { useState } from 'react';
import Homepage from './Pages/Homepage';
import { SearchPage } from './Pages/SearchPage';


// The main App component that handles navigation between pages.
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Renders the appropriate page based on the current state.
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={setCurrentPage} />;
      case 'search':
        return <SearchPage onNavigate={setCurrentPage} />;
      default:
        return <Homepage onNavigate={setCurrentPage} />;
    }
  };

  return renderPage();
};



export default App;
