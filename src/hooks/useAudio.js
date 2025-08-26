// src/hooks/useAudio.js
import { useRef } from "react";

/**
 * tiny WebAudio helper hook.
 * returns: click(), win(), lose()
 * Note: browsers may block AudioContext until a user gesture; this hook is safe to call after a click.
 */
export default function useAudio() {
  const ctxRef = useRef(null);

  function ensureCtx() {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  }

  function playTone(freq = 440, duration = 0.12, type = "sine", vol = 0.06) {
    try {
      const ctx = ensureCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.value = vol;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + duration);
    } catch (e) {
      // some browsers block audio until user gesture — ignore silently
    }
  }

  const click = () => playTone(880, 0.04, "sine", 0.04);
  const win = () => playTone(1046, 0.16, "sine", 0.12);
  const lose = () => playTone(220, 0.18, "sawtooth", 0.12);
  const draw = () => playTone(440, 0.08, "triangle", 0.06);

  return { click, win, lose, draw };
}
