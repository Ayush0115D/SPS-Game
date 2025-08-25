import confetti from "canvas-confetti";

export default function useEffects() {
  function playWinEffect() {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    flashBackground("green");
  }

  function playLoseEffect() {
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 600);
    flashBackground("red");
  }

  function flashBackground(color) {
    const overlay = document.createElement("div");
    overlay.className = `flash-${color}`;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 300);
  }

  return { playWinEffect, playLoseEffect };
}
