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
  const [playerWins, setPlayerWins] = useState(0);
  const [compWins, setCompWins] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  const [userChoice, setUserChoice] = useState(null);
  const [compChoice, setCompChoice] = useState(null);
  const [result, setResult] = useState("");

  const [bestOf, setBestOf] = useState(5);
  const roundsToWin = Math.ceil(bestOf / 2);
  const [gameOver, setGameOver] = useState(false);

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState([]);
  const [nameInput, setNameInput] = useState("");

  // Audio
  const { click, win, lose, draw } = useAudio();

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

  function decideWinner(p, c) {
    if (p === c) return "draw";
    if (
      (p === "Rock" && c === "Scissors") ||
      (p === "Paper" && c === "Rock") ||
      (p === "Scissors" && c === "Paper")
    ) {
      return "player";
    }
    return "computer";
  }

  function playRound(choiceName) {
    if (gameOver) return;
    click();
    triggerAnimation(); // button pulse animation

    const comp = CHOICES[Math.floor(Math.random() * CHOICES.length)].name;
    const winner = decideWinner(choiceName, comp);

    setUserChoice(choiceName);
    setCompChoice(comp);
    setRoundsPlayed((r) => r + 1);

    let newPlayer = playerWins;
    let newComp = compWins;

    if (winner === "player") {
      newPlayer += 1;
      setResult("🎉 You Win!");
      setFlashColor("green"); // ✅ Flash green
      win();
    } else if (winner === "computer") {
      newComp += 1;
      setResult("😢 You Lose!");
      setFlashColor("red"); // ✅ Flash red
      lose();
    } else {
      setResult("🤝 It's a Draw!");
      setFlashColor("blue"); // ✅ Flash blue
      draw();
    }

    // Reset flash after animation
    setTimeout(() => setFlashColor(null), 400);

    setPlayerWins(newPlayer);
    setCompWins(newComp);

    if (newPlayer >= roundsToWin || newComp >= roundsToWin) {
      setGameOver(true);
      setTimeout(() => {
        const finalMsg =
          newPlayer > newComp
            ? `🏆 Game Over — You won ${newPlayer}-${newComp}!`
            : `💻 Game Over — Computer won ${newComp}-${newPlayer}`;
        setResult(finalMsg);
      }, 220);
    }
  }

  function resetMatch() {
    setPlayerWins(0);
    setCompWins(0);
    setRoundsPlayed(0);
    setUserChoice(null);
    setCompChoice(null);
    setResult("");
    setGameOver(false);
    setNameInput("");
  }

  function newGameWith(bestOfValue) {
    setBestOf(bestOfValue);
    resetMatch();
  }

  // ✅ Save both playerWins and compWins
  function saveScore(name) {
    const n = (name || "Player").trim() || "Player";
    const entry = {
      name: n,
      playerScore: playerWins,
      compScore: compWins,
      date: new Date().toISOString(),
    };
    const updated = [entry, ...leaderboard].slice(0, 10); // keep last 10
    setLeaderboard(updated);
    localStorage.setItem(LB_KEY, JSON.stringify(updated));
    setNameInput("");
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
      {/* ✅ Flash overlay */}
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
            playerWins={playerWins}
            compWins={compWins}
            roundsPlayed={roundsPlayed}
            roundsToWin={roundsToWin}
            darkMode={darkMode}
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
        </section>

        {/* Result Display */}
        <section className="mb-8">
          <ResultDisplay
            userChoice={userChoice}
            compChoice={compChoice}
            result={result}
            gameOver={gameOver}
            playerWins={playerWins}
            compWins={compWins}
            nameInput={nameInput}
            setNameInput={setNameInput}
            onSaveScore={() => saveScore(nameInput)}
            onPlayAgain={resetMatch}
            darkMode={darkMode}
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
          {/* ✅ Pass both scores */}
          <Leaderboard leaderboard={leaderboard} darkMode={darkMode} />
        </section>

        {/* Footer */}
        <footer
          className={`text-center text-sm p-4 rounded-xl ${
            darkMode ? "bg-gray-800/50 text-gray-400" : "bg-white/80 text-gray-700"
          }`}
        >
          💡 <strong>Tip:</strong> Change <em>Best of</em> to adjust match length.
          🔊 Sounds use your browser audio (user gesture may be required).
        </footer>
      </div>
    </div>
  );
}
