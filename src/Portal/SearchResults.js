import { Download } from "lucide-react";
import { NewsCard } from "./NewsCard";
export function SearchResults({ articles, isLoading, topic, handleDownloadPdf, isDownloading }) {
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