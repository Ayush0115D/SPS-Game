import React from "react";

export default function Scoreboard({ playerWins, compWins, roundsPlayed, roundsToWin, darkMode }) {
  return (
    <div className={`
      w-full p-6 rounded-2xl border shadow-lg
      ${darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-300'
      }
    `}>
      <div className="grid grid-cols-3 gap-6 text-center">
        <div className="space-y-2">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            You
          </h3>
          <div className={`text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            {playerWins}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Rounds
          </h3>
          <div className={`text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
            {roundsPlayed}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            First to {roundsToWin}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            Computer
          </h3>
          <div className={`text-4xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            {compWins}
          </div>
        </div>
      </div>
    </div>
  );
}