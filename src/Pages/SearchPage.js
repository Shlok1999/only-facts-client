import { useState } from 'react';
import jsPDF from 'jspdf';
import { createPortal } from 'react-dom';
import {HistorySidebar} from '../Portal/HistorySidebar';
import {SearchResults} from '../Portal/SearchResults';
import {SearchForm} from '../Portal/SearchForm';
import { Clock } from 'lucide-react';
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

export const SearchPage = ({ onNavigate }) => {
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
              <img src={require('../assets/OnlyFacts.png')} alt="Only Facts" className="h-8" />
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
            <a href="/" className="hover:text-yellow-400 transition-colors">About</a>
            <a href="/" className="hover:text-yellow-400 transition-colors">Privacy</a>
            <a href="/" className="hover:text-yellow-400 transition-colors">Terms</a>
            <a href="/" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>
          <p className="text-gray-600 text-sm">© 2023 Only Facts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};