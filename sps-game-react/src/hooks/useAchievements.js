import { useState } from "react";

export default function useAchievements() {
  const [achievements, setAchievements] = useState([]);
  const [winStreak, setWinStreak] = useState(0);
  const [loseStreak, setLoseStreak] = useState(0);
  const [lastRoundTime, setLastRoundTime] = useState(null);

  function startRound() {
    setLastRoundTime(Date.now());
  }

  function handleResult(result) {
    let newAchievements = [];

    if (result === "win") {
      setWinStreak((st) => st + 1);
      setLoseStreak(0);

      if (winStreak + 1 === 3) newAchievements.push("🔥 Win 3 times in a row");
      if (lastRoundTime && Date.now() - lastRoundTime < 5000) {
        newAchievements.push("🎯 Speed Win (under 5s)");
      }
    } else if (result === "lose") {
      setLoseStreak((st) => st + 1);
      setWinStreak(0);

      if (loseStreak + 1 === 5) newAchievements.push("💀 Lose 5 times in a row");
    } else {
      setWinStreak(0);
      setLoseStreak(0);
    }

    if (newAchievements.length > 0) {
      setAchievements((prev) => [
        ...prev,
        ...newAchievements.filter((a) => !prev.includes(a)),
      ]);
    }
  }

  return { achievements, startRound, handleResult };
}
