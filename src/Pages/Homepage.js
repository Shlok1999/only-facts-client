import React, { useState } from 'react';
import { Search, Clock } from 'lucide-react';
import { createPortal } from 'react-dom';

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

// Homepage Component provided by the user, converted to a component for app structure.
const Homepage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col">
      {/* Header section with navigation */}
      <header className="py-4 bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl text-yellow-400">⚡</span>
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
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
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


// The new Search Page component, styled with Tailwind CSS
const SearchPage = ({ onNavigate }) => {
  const [topic, setTopic] = useState('');
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Mocks the API call to your backend.
  const mockFetchSummaries = (searchTopic) => {
    // Simulate a network delay
    return new Promise(resolve => {
      setTimeout(() => {
        const mockData = [
          {
            title: "New AI Breakthrough in Medicine",
            source: "Tech Journal",
            url: "#",
            summary: "Researchers have developed a new AI model that can predict disease progression with 95% accuracy, promising to revolutionize personalized medicine and drug discovery. The model analyzes genetic data and patient records to create a unique health profile for each individual.",
            date: "2023-10-26",
            author: "Dr. A. Sharma",
          },
          {
            title: "Global Summit Addresses Climate Change",
            source: "World News",
            url: "#",
            summary: "Leaders from over 50 countries met to discuss new strategies for combating climate change. Key agreements were reached on reducing carbon emissions and investing in sustainable infrastructure projects. Critics, however, argue the measures are not aggressive enough.",
            date: "2023-10-25",
            author: "Jane Doe",
          },
          {
            title: "Stock Market Sees Volatile Day",
            source: "Finance Weekly",
            url: "#",
            summary: "The stock market experienced significant fluctuations following an unexpected report on consumer spending. Tech stocks were hit hardest, while energy and healthcare sectors showed resilience. Analysts are predicting continued uncertainty in the short term.",
            date: "2023-10-25",
            author: "Unknown",
          },
          {
            title: "Future of Space Travel: New Propulsion Tech",
            source: "Cosmos Today",
            url: "#",
            summary: "A startup company has unveiled a prototype for a new type of ion propulsion engine that could drastically reduce the time it takes to travel to Mars. The technology, which uses a new type of plasma accelerator, is currently undergoing rigorous testing.",
            date: "2023-10-24",
            author: "Mark Evans",
          },
        ];

        // This will return an empty array if the topic is "empty" or "fail", for demonstration.
        if (searchTopic.toLowerCase().includes("empty")) {
          resolve([]);
        } else if (searchTopic.toLowerCase().includes("fail")) {
          // Simulate an API error
          throw new Error('Failed to fetch articles. Please try again.');
        } else {
          resolve(mockData);
        }
      }, 1500); // 1.5 second delay
    });
  };

  // Handles the search action
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!topic) {
      setError('Please enter a topic to search.');
      setShowModal(true);
      return;
    }
    setError('');
    setIsLoading(true);
    setArticles([]);

    try {
      // In a real app, you would use a real fetch call here
      // const response = await fetch(`/api/news-thread`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ topic }),
      // });
      // const data = await response.json();
      // if (!data.success) { throw new Error(data.error); }
      // setArticles(data.summaries);

      const summaries = await mockFetchSummaries(topic);
      setArticles(summaries);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch news summaries. Please try a different topic.');
      setShowModal(true);
    } finally {
      setIsLoading(false);
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
            <span className="text-3xl text-yellow-400">⚡</span>
            <h1 className="text-2xl font-bold">Only Facts</h1>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 bg-gray-800 text-gray-200 font-semibold rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
          >
            Back to Home
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Discover News Threads</h2>
        
        {/* Search form */}
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
          {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        </form>

        {/* Display area for results */}
        <div>
          {isLoading && !articles.length && (
            <div className="text-center text-xl text-yellow-400 animate-pulse">Fetching the facts...</div>
          )}

          {!isLoading && articles.length === 0 && topic && (
            <div className="text-center text-gray-500 text-lg">
              No articles found for "{topic}". Please try a different topic.
            </div>
          )}

          {articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <div key={index} className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{article.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">{article.summary}</p>
                  <div className="flex items-center justify-between text-gray-500 text-xs mt-auto pt-4 border-t border-gray-700">
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">
                      Read full article
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Error Modal */}
      {showModal && <ErrorModal message={error} onClose={() => setShowModal(false)} />}

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
