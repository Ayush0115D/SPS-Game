import React, { useState } from "react";
import { FaUserFriends, FaRobot, FaCheck, FaTimes, FaBars } from "react-icons/fa";

export default function GameModeSelector({ mode, onChangeMode, darkMode, onSetNames }) {
  const [showPanel, setShowPanel] = useState(true);
  const [showInputs, setShowInputs] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleConfirm = () => {
    onSetNames({ player1, player2 });
    setShowInputs(false);
  };

  return (
    <>
      {/* Toggle Button - Always visible */}
      <button
        onClick={() => setShowPanel((prev) => !prev)}
        className="fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-all sm:p-3"
        title={showPanel ? "Hide mode panel" : "Show mode panel"}
      >
        <FaBars size={18} />
      </button>

      {/* Panel */}
      {showPanel && (
        <div
          className={`fixed top-16 left-4 z-40 w-[85vw] max-w-xs sm:max-w-sm p-4 rounded-lg shadow-xl animate-fadeIn flex flex-col gap-3 ${
            darkMode ? "bg-gray-800 border border-indigo-500" : "bg-gray-100 border border-indigo-700"
          }`}
          style={{ animationDuration: "0.4s" }}
        >
          <h3
            className={`font-extrabold text-lg sm:text-xl select-none border-b pb-1 ${
              darkMode ? "text-indigo-400 border-indigo-400" : "text-indigo-700 border-indigo-700"
            }`}
          >
            Select Mode
          </h3>

          {/* PvP Button */}
          <button
            onClick={() => {
              onChangeMode("pvp");
              setShowInputs(true);
              setPlayer1("");
              setPlayer2("");
            }}
            className={`
              w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold text-sm sm:text-base transition
              ${
                mode === "pvp"
                  ? "bg-indigo-600 text-white shadow"
                  : darkMode
                  ? "bg-gray-700 text-indigo-300 hover:bg-indigo-600 hover:text-white"
                  : "bg-gray-300 text-indigo-700 hover:bg-indigo-500 hover:text-white"
              }
            `}
          >
            <FaUserFriends size={18} />
            Player vs Player
          </button>

          {/* PvC Button */}
          <button
            onClick={() => {
              onChangeMode("pvc");
              setShowInputs(true);
              setPlayer1("");
              setPlayer2("Computer");
            }}
            className={`
              w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold text-sm sm:text-base transition
              ${
                mode === "pvc"
                  ? "bg-purple-600 text-white shadow"
                  : darkMode
                  ? "bg-gray-700 text-purple-300 hover:bg-purple-600 hover:text-white"
                  : "bg-gray-300 text-purple-700 hover:bg-purple-500 hover:text-white"
              }
            `}
          >
            <FaRobot size={18} />
            Player vs Computer
          </button>

          {/* Name Input Section */}
          {showInputs && (
            <div
              className={`mt-3 p-3 rounded-lg ${
                darkMode ? "bg-gray-900 border border-indigo-500" : "bg-white border border-indigo-700"
              }`}
            >
              <h4 className="font-bold text-sm mb-2">Player Names</h4>

              <input
                type="text"
                placeholder="Player 1"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                className="w-full mb-2 px-3 py-2 rounded-md border focus:outline-none text-sm"
              />

              <input
                type="text"
                placeholder={mode === "pvp" ? "Player 2" : "Computer"}
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                disabled={mode === "pvc"}
                className="w-full mb-2 px-3 py-2 rounded-md border focus:outline-none text-sm disabled:opacity-50"
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setShowInputs(false)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                >
                  <FaTimes />
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-3 py-1 bg-green-500 text-white rounded-md text-sm"
                >
                  <FaCheck />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
