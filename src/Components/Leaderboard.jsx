import React from "react";

export default function Leaderboard({ leaderboard, darkMode }) {
  if (leaderboard.length === 0) {
    return (
      <div className={`
        p-8 rounded-2xl border text-center
        ${darkMode 
          ? 'bg-gray-800 border-gray-700 text-gray-400' 
          : 'bg-white border-gray-300 text-gray-600'
        }
      `}>
        No scores yet. Win a game to appear here!
      </div>
    );
  }

  return (
    <div className={`
      rounded-2xl border overflow-hidden
      ${darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-300'
      }
    `}>
      {leaderboard.map((entry, index) => (
        <div 
          key={index}
          className={`
            flex items-center justify-between p-4 border-b last:border-b-0
            ${darkMode ? 'border-gray-700' : 'border-gray-200'}
            ${index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20' : ''}
          `}
        >
          {/* Rank + Name + Date */}
          <div className="flex items-center gap-4">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
              ${index === 0 
                ? 'bg-yellow-500 text-white' 
                : index === 1 
                ? 'bg-gray-400 text-white' 
                : index === 2 
                ? 'bg-orange-600 text-white'
                : darkMode 
                ? 'bg-gray-700 text-gray-300' 
                : 'bg-gray-200 text-gray-700'
              }
            `}>
              {index + 1}
            </div>
            <div>
              <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {entry.name}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {new Date(entry.date).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          {/* Score vs Opponent */}
          <div className="text-right">
          <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
       {entry.playerScore}-{entry.computerScore}
     </div>
     <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      final score
      </div>
          </div>
        </div>
      ))}
    </div>
  );
}
