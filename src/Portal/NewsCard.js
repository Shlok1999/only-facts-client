import { useState } from "react";
export function NewsCard({ article, index, total }) {
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