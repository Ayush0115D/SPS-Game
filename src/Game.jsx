// src/Game.jsx
import React, { useEffect, useState } from "react";
import {
  FaHandRock,
  FaHandPaper,
  FaHandScissors,
  FaTrophy,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import useAudio from "./hooks/useAudio";
import ChoiceButton from "./components/ChoiceButton";
import Scoreboard from "./components/Scoreboard";
import Controls from "./components/Controls";
import ResultDisplay from "./components/ResultDisplay";
import Leaderboard from "./components/Leaderboard";
import useButtonAnimation from "./hooks/useButtonAnimation";
import GameModeSelector from "./Components/GameModeSelector";

const CHOICES = [
  { name: "Rock", Icon: FaHandRock, emoji: "✊" },
  { name: "Paper", Icon: FaHandPaper, emoji: "✋" },
  { name: "Scissors", Icon: FaHandScissors, emoji: "✌️" },
];

const LB_KEY = "sps_leaderboard_v1";

export default function Game() {
  const { animate, triggerAnimation } = useButtonAnimation();

  // Flash state
  const [flashColor, setFlashColor] = useState(null);

  // Theme state
  const [darkMode, setDarkMode] = useState(true);

  // Match state
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  // Choices for both players
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);

  const [result, setResult] = useState("");
  const [bestOf, setBestOf] = useState(5);
  const roundsToWin = Math.ceil(bestOf / 2);
  const [gameOver, setGameOver] = useState(false);

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState([]);

  // Audio
  const { click, win, lose, draw } = useAudio();

  // Game mode state: "pvc" or "pvp"
  const [gameMode, setGameMode] = useState("pvc");

  // Custom player names
  const [playerNames, setPlayerNames] = useState({
    player1: "You",
    player2: "Computer",
  });

  // Tracks which player's turn it is in PvP mode
  const [pvpTurn, setPvpTurn] = useState(1);

  // Load leaderboard on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LB_KEY) || "[]");
      setLeaderboard(Array.isArray(saved) ? saved : []);
    } catch (e) {
      console.error("Error loading leaderboard", e);
    }
  }, []);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("sps_theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem("sps_theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  function decideWinner(p1, p2) {
    if (p1 === p2) return "draw";
    if (
      (p1 === "Rock" && p2 === "Scissors") ||
      (p1 === "Paper" && p2 === "Rock") ||
      (p1 === "Scissors" && p2 === "Paper")
    ) {
      return "player1";
    }
    return "player2";
  }

  function playRound(choiceName) {
    if (gameOver) return;
    click();
    triggerAnimation();

    if (gameMode === "pvc") {
      const compChoice =
        CHOICES[Math.floor(Math.random() * CHOICES.length)].name;
      const winner = decideWinner(choiceName, compChoice);

      setPlayer1Choice(choiceName);
      setPlayer2Choice(compChoice);
      setRoundsPlayed((r) => r + 1);

      let newP1Wins = player1Wins;
      let newP2Wins = player2Wins;

      if (winner === "player1") {
        newP1Wins++;
        setResult(`🎉 ${playerNames.player1} Wins!`);
        setFlashColor("green");
        win();
      } else if (winner === "player2") {
        newP2Wins++;
        setResult(`😢 ${playerNames.player2} Wins!`);
        setFlashColor("red");
        lose();
      } else {
        setResult("🤝 It's a Draw!");
        setFlashColor("blue");
        draw();
      }

      setTimeout(() => setFlashColor(null), 400);

      setPlayer1Wins(newP1Wins);
      setPlayer2Wins(newP2Wins);

      if (newP1Wins >= roundsToWin || newP2Wins >= roundsToWin) {
        setGameOver(true);
        setTimeout(() => {
          setResult(
            newP1Wins > newP2Wins
              ? `🏆 Game Over — ${playerNames.player1} won ${newP1Wins}-${newP2Wins}!`
              : `🏆 Game Over — ${playerNames.player2} won ${newP2Wins}-${newP1Wins}!`
          );
          saveScore();
        }, 220);
      }
    } else {
      if (pvpTurn === 1) {
        setPlayer1Choice(choiceName);
        setResult(`${playerNames.player2}'s turn`);
        setPvpTurn(2);
      } else {
        setPlayer2Choice(choiceName);
        const winner = decideWinner(player1Choice, choiceName);
        setRoundsPlayed((r) => r + 1);

        let newP1Wins = player1Wins;
        let newP2Wins = player2Wins;

        if (winner === "player1") {
          newP1Wins++;
          setResult(`🎉 ${playerNames.player1} Wins!`);
          setFlashColor("green");
          win();
        } else if (winner === "player2") {
          newP2Wins++;
          setResult(`🎉 ${playerNames.player2} Wins!`);
          setFlashColor("red");
          lose();
        } else {
          setResult("🤝 It's a Draw!");
          setFlashColor("blue");
          draw();
        }

        setTimeout(() => setFlashColor(null), 400);

        setPlayer1Wins(newP1Wins);
        setPlayer2Wins(newP2Wins);
        setPvpTurn(1);

        if (newP1Wins >= roundsToWin || newP2Wins >= roundsToWin) {
          setGameOver(true);
          setTimeout(() => {
            setResult(
              newP1Wins > newP2Wins
                ? `🏆 Game Over — ${playerNames.player1} won ${newP1Wins}-${newP2Wins}!`
                : `🏆 Game Over — ${playerNames.player2} won ${newP2Wins}-${newP1Wins}!`
            );
            saveScore();
          }, 220);
        }
      }
    }
  }

  function resetMatch() {
    setPlayer1Wins(0);
    setPlayer2Wins(0);
    setRoundsPlayed(0);
    setPlayer1Choice(null);
    setPlayer2Choice(null);
    setResult("");
    setGameOver(false);
    setPvpTurn(1);
  }

  function newGameWith(bestOfValue) {
    setBestOf(bestOfValue);
    resetMatch();
  }

  // ✅ Save score for leaderboard
  function saveScore() {
    if (!gameOver) return;
    const winner =
      player1Wins > player2Wins ? playerNames.player1 : playerNames.player2;
    const loser =
      player1Wins > player2Wins ? playerNames.player2 : playerNames.player1;

    const entry = {
      winner,
      loser,
      winnerScore: Math.max(player1Wins, player2Wins),
      loserScore: Math.min(player1Wins, player2Wins),
      mode: gameMode.toUpperCase(),
      timestamp: new Date().toISOString(),
    };

    const updated = [entry, ...leaderboard].slice(0, 10);
    setLeaderboard(updated);
    localStorage.setItem(LB_KEY, JSON.stringify(updated));
  }

  function clearLeaderboard() {
    localStorage.removeItem(LB_KEY);
    setLeaderboard([]);
  }

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div
      className={`min-h-screen relative overflow-hidden p-6 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      {/* Flash overlay */}
      {flashColor && (
        <div
          className={`absolute inset-0 z-50 animate-fadeout pointer-events-none ${
            flashColor === "green"
              ? "bg-green-400/40"
              : flashColor === "red"
              ? "bg-red-400/40"
              : "bg-blue-400/40"
          }`}
        ></div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold flex items-center gap-4">
            <FaTrophy
              className={`text-yellow-500 ${
                animate ? "animate-bounce" : "animate-pulse"
              }`}
            />
            <span
              className={`${
                darkMode
                  ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent"
              }`}
            >
              The Classic Battle: SPS Game
            </span>
          </h1>

          <div className="flex items-center gap-4">
            <GameModeSelector
              mode={gameMode}
              onChangeMode={(mode) => {
                setGameMode(mode);
                resetMatch();
              }}
              darkMode={darkMode}
              onSetNames={setPlayerNames}
            />

            <button
              onClick={toggleDarkMode}
              className={`
                p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg
                ${
                  darkMode
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900"
                    : "bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white"
                }
              `}
            >
              {darkMode ? (
                <FaSun className="text-xl" />
              ) : (
                <FaMoon className="text-xl" />
              )}
            </button>

            <Controls
              onReset={resetMatch}
              onClearLeaderboard={clearLeaderboard}
              bestOf={bestOf}
              onChangeBestOf={newGameWith}
              darkMode={darkMode}
            />
          </div>
        </header>

        {/* Scoreboard */}
        <section className="mb-8">
          <Scoreboard
            playerWins={player1Wins}
            compWins={player2Wins}
            roundsPlayed={roundsPlayed}
            roundsToWin={roundsToWin}
            darkMode={darkMode}
            player1Label={playerNames.player1}
            player2Label={playerNames.player2}
          />
        </section>

        {/* Choice Buttons */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            {CHOICES.map((c) => (
              <ChoiceButton
                key={c.name}
                name={c.name}
                Icon={c.Icon}
                emoji={c.emoji}
                onChoose={playRound}
                disabled={gameOver}
                darkMode={darkMode}
              />
            ))}
          </div>
          {gameMode === "pvp" && (
            <p className="mt-4 text-center font-semibold text-lg">
              {gameOver
                ? "Game Over!"
                : `Turn: ${
                    pvpTurn === 1 ? playerNames.player1 : playerNames.player2
                  }`}
            </p>
          )}
        </section>

        {/* Result Display */}
        <section className="mb-8">
          <ResultDisplay
            userChoice={player1Choice}
            compChoice={player2Choice}
            result={result}
            gameOver={gameOver}
            playerWins={player1Wins}
            compWins={player2Wins}
            onPlayAgain={resetMatch}
            darkMode={darkMode}
            player1Label={playerNames.player1}
            player2Label={playerNames.player2}
          />
        </section>

        {/* Leaderboard */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              🏆 Leaderboard
            </h2>
            <div
              className={`text-sm px-3 py-1 rounded-full ${
                darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
              }`}
            >
              Last 10 games
            </div>
          </div>
          <Leaderboard leaderboard={leaderboard} darkMode={darkMode} />
        </section>
      </div>
    </div>
  );
}
