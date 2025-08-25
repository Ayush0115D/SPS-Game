import React, { useState } from "react";
import { FaRedo, FaTrash, FaCog } from "react-icons/fa";

export default function Controls({ 
  onReset, 
  onClearLeaderboard, 
  bestOf, 
  onChangeBestOf, 
  darkMode 
}) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="relative flex items-center gap-3">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`
          p-3 rounded-xl transition-all duration-300 hover:scale-105
          ${darkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }
        `}
      >
        <FaCog className="text-xl" />
      </button>

      {showSettings && (
        <div className={`
          absolute top-16 right-0 p-4 rounded-xl shadow-xl border z-10 min-w-48
          ${darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-300'
          }
        `}>
          <div className="space-y-3">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Best of:
              </label>
              <select
                value={bestOf}
                onChange={(e) => onChangeBestOf(Number(e.target.value))}
                className={`
                  w-full p-2 rounded-lg border
                  ${darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-400 text-gray-900'
                  }
                `}
              >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={7}>7</option>
                <option value={9}>9</option>
              </select>
            </div>
            
            <button
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FaRedo className="text-sm" />
              Reset Game
            </button>
            
            <button
              onClick={onClearLeaderboard}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <FaTrash className="text-sm" />
              Clear Scores
            </button>
          </div>
        </div>
      )}
    </div>
  );
}