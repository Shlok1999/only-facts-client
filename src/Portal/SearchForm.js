// The search form component
import { Search } from "lucide-react";
export function SearchForm({ topic, setTopic, handleSearch, isLoading }) {
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