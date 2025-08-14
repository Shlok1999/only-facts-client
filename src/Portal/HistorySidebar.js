import { Clock, Trash2, X } from "lucide-react";
import { createPortal } from "react-dom";
export  function HistorySidebar({ history, onHistoryClick, onClear, onClose, isOpen }) {
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