import React, { useState } from 'react';
import { Search, Clock, Download, Trash2, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { jsPDF } from 'jspdf';


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

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}



// Homepage Component provided by the user, converted to a component for app structure.
const Homepage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      {/* Header section with navigation */}
      <header className="py-4 bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl text-yellow-400">
              <img src={require("./assets/OnlyFacts.png")} alt="Only Facts" className="h-8" />
            </span>
            <h1 className="text-2xl font-bold">Only Facts</h1>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition-colors duration-300"
          >
            Explore Threads
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero section */}
        <section className="py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Cut through the noise.<br />Get just the facts.
            </h2>
            <p className="lg:text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Only Facts delivers concise, unbiased news summaries so you can stay informed in minutes, not hours.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => onNavigate('search')}
                className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-xl hover:bg-yellow-500 transition-transform duration-300 transform hover:scale-105"
              >
                Try It Free
              </button>
              <button className="px-8 py-4 bg-gray-800 text-gray-200 font-bold rounded-full shadow-xl hover:bg-gray-700 transition-transform duration-300 transform hover:scale-105">
                How It Works
              </button>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-12">Why Only Facts?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">⏱️</div>
                <h4 className="text-xl font-semibold mb-2">Save Time</h4>
                <p className="text-gray-400">Get the essence of news stories in 60 seconds or less.</p>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">🧠</div>
                <h4 className="text-xl font-semibold mb-2">AI-Powered</h4>
                <p className="text-gray-400">Our algorithms extract key facts without editorial bias.</p>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="text-xl font-semibold mb-2">Multi-Source</h4>
                <p className="text-gray-400">Summaries compiled from multiple reputable sources.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-8">What Our Users Say</h3>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-700">
              <p className="text-lg italic text-gray-300 mb-6">"Only Facts has changed how I consume news. I'm informed without feeling overwhelmed."</p>
              <div className="flex items-center justify-center">
                <div className="text-4xl mr-4">👩‍💼</div>
                <div className="text-left">
                  <strong className="block text-xl">Sarah K.</strong>
                  <span className="text-gray-400">Busy Professional</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer section */}
      <footer className="bg-gray-950 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-3xl text-yellow-400">⚡</span>
            <h2 className="text-2xl font-bold">Only Facts</h2>
          </div>
          <p className="text-gray-500 mb-4">Just the facts. Nothing else.</p>
          <div className="flex justify-center space-x-6 text-gray-400 text-sm mb-4">
            <a href="#" className="hover:text-yellow-400 transition-colors">About</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>
          <p className="text-gray-600 text-sm">© 2023 Only Facts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};


// -----------------------------------------------------------
// New components for the search page
// -----------------------------------------------------------

// A single news card component
function NewsCard({ article, index, total }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const summaryLimit = 200;
  const isTruncated = article.summary.length > summaryLimit;

  const renderTextWithBold = (text) => {
    // This function splits the text by '**' and alternates between bold and regular text
    const parts = text.split('**');
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <b key={i}>{part}</b>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-700 relative transition-transform transform hover:-translate-y-1">
      {/* Thread Counter */}
      <div className="absolute top-4 right-4 text-sm font-bold text-gray-500">
        {index + 1}/{total}
      </div>

      {/* Small Heading: Source */}
      <h4 className="text-sm font-semibold text-yellow-400 mb-2 uppercase tracking-wider">{article.source}</h4>

      {/* Big Heading: Title */}
      <h2 className="text-2xl font-bold mb-3 text-gray-100">
        {renderTextWithBold(article.title)}
      </h2>

      {/* Summary with Read More toggle */}
      <p className="text-base text-gray-300 mb-4 leading-relaxed">
        {isExpanded
          ? renderTextWithBold(article.summary)
          : renderTextWithBold(article.summary.slice(0, summaryLimit))}
        {isTruncated && !isExpanded && "..."}
        {isTruncated && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-yellow-400 hover:text-yellow-300 font-semibold ml-2"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </p>

      {/* Read Full Article Button */}
      <div className="flex gap-3 mt-4">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-5 py-2 rounded-full text-sm font-bold transition-colors duration-300"
        >
          Read Full Article
        </a>
      </div>
    </div>
  );
}



// The search form component
const SearchForm = ({ topic, setTopic, handleSearch, isLoading }) => {
  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-10">
      <div className="flex items-center bg-gray-800 rounded-full shadow-lg p-1 border border-gray-700">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Search for a topic, e.g., 'artificial intelligence' or 'climate change'"
          className="flex-grow bg-transparent text-gray-200 placeholder-gray-500 py-3 px-6 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-l-full"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-gray-900 rounded-full p-3 m-1 shadow-lg hover:bg-yellow-500 transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Search size={24} />
          )}
        </button>
      </div>
    </form>
  );
};

// The search results display component
const SearchResults = ({ articles, isLoading, topic, handleDownloadPdf, isDownloading }) => {
  if (isLoading) {
    return (
      <div className="text-center text-xl text-yellow-400 animate-pulse">Fetching the facts...</div>
    );
  }

  if (articles.length === 0 && topic) {
    return (
      <div className="text-center text-gray-500 text-lg">
        No articles found for "{topic}". Please try a different topic.
      </div>
    );
  }

  if (articles.length > 0) {
    return (
      <>
        <div className="flex justify-end mb-6">
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex items-center space-x-2 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-full shadow-lg hover:bg-yellow-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Download size={20} />
            )}
            <span>{isDownloading ? "Downloading..." : "Download as PDF"}</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </>
    );
  }

  return null;
};
// History Sidebar Component
// Updated History Sidebar Component
const HistorySidebar = ({ history, onHistoryClick, onClear, onClose, isOpen }) => {
  return createPortal(
    <>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-2xl z-[110] transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col border-l border-gray-700`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200">Search History</h3>
          <button
            onClick={onClose}
            className="text-gray-400 p-1 rounded-full hover:bg-gray-700 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {history.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {history.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => onHistoryClick(item)}
                    className="w-full text-left p-3 hover:bg-gray-800 transition-colors text-gray-300 flex items-start gap-3"
                  >
                    <Clock size={16} className="flex-shrink-0 mt-0.5 text-gray-500" />
                    <span className="text-sm line-clamp-1 text-left">{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Clock size={24} className="mb-2" />
              <p className="text-sm">No search history yet</p>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={onClear}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 rounded-md transition-colors"
            >
              <Trash2 size={16} />
              Clear all history
            </button>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-[105] backdrop-blur-sm"
        ></div>
      )}
    </>,
    document.body
  );
};

// The new Search Page component, styled with Tailwind CSS
const SearchPage = ({ onNavigate }) => {
  const url = "https://only-facts.onrender.com"

  const [topic, setTopic] = useState('');
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useLocalStorage('searchHistory', []);
  const [articlesCache, setArticlesCache] = useLocalStorage('articlesCache', {});
  // Handles the search action
  // Core search logic
  const performSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setError('Please enter a topic to search.');
      setShowModal(true);
      return;
    }

    // Check local storage cache first
    if (articlesCache[searchTerm.toLowerCase()]) {
      setArticles(articlesCache[searchTerm.toLowerCase()]);
      setIsLoading(false);
      return;
    }

    setError('');
    setIsLoading(true);
    setArticles([]);

    try {
      const response = await fetch(`${url}/api/news-thread`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: searchTerm }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch news summaries');
      }

      setArticles(data.summaries);

      // Update the history and cache
      setHistory(prevHistory => {
        const updatedHistory = [searchTerm, ...prevHistory.filter(item => item.toLowerCase() !== searchTerm.toLowerCase())];
        return updatedHistory.slice(0, 20); // Keep latest 20 searches
      });
      setArticlesCache(prevCache => ({
        ...prevCache,
        [searchTerm.toLowerCase()]: data.summaries,
      }));

    } catch (err) {
      console.error(err);
      setError('Failed to fetch news summaries. Please try a different topic.');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(topic);
  };

  // Handles a click on a history item
  const handleHistorySearch = (historyTopic) => {
    setIsHistoryOpen(false);
    setTopic(historyTopic);
    performSearch(historyTopic);
  };

  // Clears all history and cache
  const handleClearHistory = () => {
    setHistory([]);
    setArticlesCache({});
    setArticles([]);
  };

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    setError('');

    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' }); // A4 standard paper
      const margin = 50;
      const lineHeight = 18;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let y = margin;

      // ===== HEADER =====
      doc.setFont('times', 'bold');
      doc.setFontSize(20);
      doc.text(`Research Summary: ${topic}`, margin, y);
      y += 25;

      doc.setFont('times', 'italic');
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, y);
      y += 15;

      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y); // horizontal line
      y += 20;

      // ===== ARTICLES =====
      articles.forEach((article, index) => {
        // New page check
        if (y > pageHeight - 100) {
          doc.addPage();
          y = margin;
        }

        // Article number + title
        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        doc.text(`${index + 1}. ${article.title}`, margin, y);
        y += lineHeight;

        // Source
        doc.setFont('times', 'italic');
        doc.setFontSize(11);
        doc.text(`Source: ${article.source}`, margin, y);
        y += lineHeight;

        // Summary (justified paragraphs)
        doc.setFont('times', 'normal');
        doc.setFontSize(12);
        const summaryLines = doc.splitTextToSize(article.summary, pageWidth - margin * 2);
        summaryLines.forEach(line => {
          doc.text(line, margin, y, { align: 'justify' });
          y += lineHeight;
        });

        y += 5;

        // Read full article link
        doc.setTextColor(0, 0, 255);
        doc.textWithLink('Read full article', margin, y, { url: article.url });
        doc.setTextColor(0, 0, 0);
        y += 25;

        // Section divider
        doc.setDrawColor(200);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;
      });

      // ===== SAVE PDF =====
      doc.save(`${topic.replace(/\s+/g, '_') || 'news'}_thread.pdf`);

    } catch (err) {
      console.error("Download Error:", err);
      setError("Failed to download PDF. Please try again.");
      setShowModal(true);
    } finally {
      setIsDownloading(false);
    }
  };



  // Custom modal for errors, replacing `alert()`
  const ErrorModal = ({ message, onClose }) => {
    return createPortal(
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100]">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 max-w-sm w-full mx-4">
          <h3 className="text-xl font-bold text-red-500 mb-4">Error</h3>
          <p className="text-gray-300 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      {/* Header section for the search page */}
      <header className="py-4 bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl text-yellow-400">
              <img src={require('./assets/OnlyFacts.png')} alt="Only Facts" className="h-8" />
            </span>
            <h1 className="text-2xl font-bold">Only Facts</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-200 font-semibold rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
            >
              <Clock size={18} />
              Show History
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 bg-gray-800 text-gray-200 font-semibold rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Discover News Threads</h2>

        {/* Search form component */}
        <SearchForm topic={topic} setTopic={setTopic} handleSearch={handleSearch} isLoading={isLoading} />
        {error && <p className="text-red-400 text-center mt-2">{error}</p>}

        {/* Search results component */}
        <SearchResults articles={articles} isLoading={isLoading} topic={topic} handleDownloadPdf={handleDownloadPdf} isDownloading={isDownloading} />

      </main>

      {/* Error Modal */}
      {showModal && <ErrorModal message={error} onClose={() => setShowModal(false)} />}

      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onHistoryClick={handleHistorySearch}
        onClear={handleClearHistory}
      />

      {/* Footer section */}
      <footer className="bg-gray-950 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-3xl text-yellow-400">⚡</span>
            <h2 className="text-2xl font-bold">Only Facts</h2>
          </div>
          <p className="text-gray-500 mb-4">Just the facts. Nothing else.</p>
          <div className="flex justify-center space-x-6 text-gray-400 text-sm mb-4">
            <a href="#" className="hover:text-yellow-400 transition-colors">About</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>
          <p className="text-gray-600 text-sm">© 2023 Only Facts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
