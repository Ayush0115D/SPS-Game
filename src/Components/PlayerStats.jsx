import React from "react";
import { FaTrophy, FaTimes, FaHandshake, FaGamepad, FaMedal } from "react-icons/fa";

export default function PlayerStats({ playerName, playerStats, darkMode }) {
  // Filter stats for current player
  const currentPlayerStats = playerStats.filter(
    stat => stat.playerName.toLowerCase() === playerName.toLowerCase()
  );

  if (currentPlayerStats.length === 0) {
    return (
      <div className={`
        p-6 rounded-xl border text-center
        ${darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-300'
        }
      `}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <FaGamepad className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {playerName}'s Stats
          </h3>
        </div>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          No games played yet. Start playing to see your statistics!
        </p>
      </div>
    );
  }

  // Calculate stats
  const totalGames = currentPlayerStats.length;
  const wins = currentPlayerStats.filter(stat => stat.result === "win").length;
  const losses = currentPlayerStats.filter(stat => stat.result === "lose").length;
  const draws = currentPlayerStats.filter(stat => stat.result === "draw").length;
  const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : 0;

  // --- 🏆 Achievements ---
  const recentResults = currentPlayerStats.slice(-5).map(stat => stat.result);
  const achievements = [];

  if (recentResults.slice(-3).every(r => r === "win")) {
    achievements.push("🔥 Streak Winner (3 wins in a row)");
  }
  if (currentPlayerStats.some(stat => stat.result === "win" && stat.timeTaken < 5000)) {
    achievements.push("🎯 Speed Winner (Win under 5s)");
  }
  if (recentResults.slice(-5).every(r => r === "lose")) {
    achievements.push("💀 Perseverance (5 losses in a row)");
  }

  return (
    <div className={`
      p-6 rounded-xl border
      ${darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-300'
      }
    `}>
      <div className="flex items-center justify-center gap-2 mb-6">
        <FaGamepad className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {playerName}'s Stats
        </h3>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {totalGames}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Total Games
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <FaTrophy className="text-green-500" />
            <span className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
              {wins}
            </span>
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Wins
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <FaTimes className="text-red-500" />
            <span className={`text-2xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
              {losses}
            </span>
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Losses
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <FaHandshake className="text-yellow-500" />
            <span className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
              {draws}
            </span>
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Draws
          </div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            {winRate}%
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Win Rate
          </div>
        </div>
      </div>

      {/* 🏆 Achievements Section */}
      {achievements.length > 0 && (
        <div className="mb-6">
          <h4 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <FaMedal className="text-yellow-400" /> Achievements
          </h4>
          <ul className="space-y-2">
            {achievements.map((ach, i) => (
              <li 
                key={i} 
                className={`p-2 rounded-lg text-sm font-medium 
                  ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}
                `}
              >
                {ach}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Games */}
      <div>
        <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Recent Games
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {currentPlayerStats
            .slice(-10) // Show last 10 games
            .reverse() // Most recent first
            .map((stat, index) => (
              <div 
                key={index}
                className={`
                  flex items-center justify-between p-3 rounded-lg
                  ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-3 h-3 rounded-full
                    ${stat.result === 'win' 
                      ? 'bg-green-500' 
                      : stat.result === 'lose' 
                      ? 'bg-red-500' 
                      : 'bg-yellow-500'
                    }
                  `}></div>
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stat.result === 'win' ? '🏆 Won' : stat.result === 'lose' ? '😢 Lost' : '🤝 Draw'}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.playerScore}-{stat.computerScore} • Best of {stat.bestOf}
                    </div>
                  </div>
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {new Date(stat.date).toLocaleDateString()}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
