import React from "react";

export default function ResultDisplay({ 
  userChoice, 
  compChoice, 
  result, 
  gameOver, 
  playerWins, 
  compWins,
  nameInput,
  setNameInput,
  onSaveScore,
  onPlayAgain,
  darkMode 
}) {
  const CHOICES = [
    { name: "Rock", emoji: "✊" },
    { name: "Paper", emoji: "✋" },
    { name: "Scissors", emoji: "✌️" },
  ];

  const getUserEmoji = () => {
    const choice = CHOICES.find(c => c.name === userChoice);
    return choice ? choice.emoji : "";
  };

  const getCompEmoji = () => {
    const choice = CHOICES.find(c => c.name === compChoice);
    return choice ? choice.emoji : "";
  };

  return (
    <div className={`
      p-6 rounded-2xl border text-center space-y-4
      ${darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-300'
      }
    `}>
      {userChoice && compChoice && (
        <div className="grid grid-cols-3 gap-4 items-center mb-6">
          <div className="text-center">
            <div className="text-6xl mb-2">{getUserEmoji()}</div>
            <p className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>You</p>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{userChoice}</p>
          </div>
          
          <div className={`text-4xl font-bold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            VS
          </div>
          
          <div className="text-center">
            <div className="text-6xl mb-2">{getCompEmoji()}</div>
            <p className={`font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Computer</p>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{compChoice}</p>
          </div>
        </div>
      )}

      {result && (
        <div className={`text-2xl font-bold p-4 rounded-xl
          ${result.includes('Win') 
            ? `text-green-600 ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}` 
            : result.includes('Lose') 
            ? `text-red-600 ${darkMode ? 'bg-red-900/30' : 'bg-red-100'}`
            : `text-yellow-600 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`
          }
        `}>
          {result}
        </div>
      )}

      {gameOver && playerWins > compWins && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className={`
                flex-1 p-3 rounded-lg border
                ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-400 text-gray-900 placeholder-gray-500'
                }
              `}
            />
            <button
              onClick={onSaveScore}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              Save Score
            </button>
          </div>
          <button
            onClick={onPlayAgain}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      {gameOver && playerWins <= compWins && (
        <button
          onClick={onPlayAgain}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          Try Again
        </button>
      )}

      {!result && (
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Make your move! 👆
        </p>
      )}
    </div>
  );
}