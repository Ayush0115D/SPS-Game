import React, { useState } from "react";

const choices = ["Rock", "Paper", "Scissors"];

function Game() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const playGame = (choice) => {
    const compChoice = choices[Math.floor(Math.random() * 3)];
    setUserChoice(choice);
    setComputerChoice(compChoice);

    if (choice === compChoice) {
      setResult("It's a Draw!");
    } else if (
      (choice === "Rock" && compChoice === "Scissors") ||
      (choice === "Paper" && compChoice === "Rock") ||
      (choice === "Scissors" && compChoice === "Paper")
    ) {
      setResult("🎉 You Win!");
    } else {
      setResult("😢 You Lose!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Stone Paper Scissors</h1>

      <div className="flex gap-4 mb-6">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => playGame(choice)}
            className="bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded-lg text-lg"
          >
            {choice}
          </button>
        ))}
      </div>

      {userChoice && (
        <div className="text-xl">
          <p>You chose: <b>{userChoice}</b></p>
          <p>Computer chose: <b>{computerChoice}</b></p>
          <p className="mt-4 text-2xl">{result}</p>
        </div>
      )}
    </div>
  );
}

export default Game;
