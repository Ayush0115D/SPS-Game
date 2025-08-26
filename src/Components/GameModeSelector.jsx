import React, { useState } from "react";
import { FaUserFriends, FaRobot } from "react-icons/fa";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function GameModeSelector({ mode, onChangeMode, darkMode, onSetNames }) {
  const [showInputs, setShowInputs] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleConfirm = () => {
    onSetNames({ player1, player2 });
    setShowInputs(false);
  };

  return (
    <div
      className="fixed top-4 left-4 z-50 flex flex-col animate-fadeIn"
      style={{ animationDuration: "0.5s" }}
    >
      <h3
        className={`font-extrabold text-2xl select-none mb-5 border-b-2 pb-1 ${
          darkMode
            ? "text-indigo-400 border-indigo-400"
            : "text-indigo-700 border-indigo-700"
        }`}
      >
        Select Mode
      </h3>

      <button
        onClick={() => {
          onChangeMode("pvp");
          setShowInputs(true);
          setPlayer1("");
          setPlayer2("");
        }}
        className={`
          flex items-center gap-3 px-8 py-3 rounded-xl font-bold text-lg transition-transform duration-200 ease-in-out
          transform focus:outline-none
          ${
            mode === "pvp"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-700/70"
              : darkMode
              ? "bg-gray-700 text-indigo-300 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-600/70"
              : "bg-gray-300 text-indigo-700 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/60"
          }
          hover:scale-110 focus:scale-110 mb-3
        `}
      >
        <FaUserFriends size={22} />
        Player vs Player
      </button>

      <button
        onClick={() => {
          onChangeMode("pvc");
          setShowInputs(true);
          setPlayer1("");
          setPlayer2("Computer");
        }}
        className={`
          flex items-center gap-3 px-8 py-3 rounded-xl font-bold text-lg transition-transform duration-200 ease-in-out
          transform focus:outline-none
          ${
            mode === "pvc"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-700/70"
              : darkMode
              ? "bg-gray-700 text-purple-300 hover:bg-purple-600 hover:text-white hover:shadow-lg hover:shadow-purple-600/70"
              : "bg-gray-300 text-purple-700 hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/60"
          }
          hover:scale-110 focus:scale-110
        `}
      >
        <FaRobot size={22} />
        Player vs Computer
      </button>

      {/* Name input section */}
      {showInputs && (
        <div
          className={`mt-4 p-4 rounded-xl border ${
            darkMode ? "border-indigo-500 bg-gray-800" : "border-indigo-700 bg-gray-100"
          }`}
        >
          <h4 className="font-bold text-lg mb-2">Player Names</h4>
          <input
            type="text"
            placeholder="Player 1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="w-full mb-2 px-3 py-2 rounded-lg border focus:outline-none"
          />
          <input
            type="text"
            placeholder={mode === "pvp" ? "Player 2" : "Computer"}
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            disabled={mode === "pvc"} // Computer name fixed
            className="w-full mb-2 px-3 py-2 rounded-lg border focus:outline-none"
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setShowInputs(false)}
              className="px-3 py-2 bg-red-500 text-white rounded-lg"
            >
              <FaTimes />
            </button>
            <button
              onClick={handleConfirm}
              className="px-3 py-2 bg-green-500 text-white rounded-lg"
            >
              <FaCheck />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
