import { useState, useEffect } from "react";

export default function useButtonAnimation() {
  const [animation, setAnimation] = useState(null); // "win" | "lose" | "draw" | null

  // trigger animation with type
  const triggerAnimation = (type) => {
    setAnimation(type);
  };

  // remove after animation ends
  useEffect(() => {
    if (animation) {
      const timer = setTimeout(() => {
        setAnimation(null);
      }, 400); // animation lasts 0.4s
      return () => clearTimeout(timer);
    }
  }, [animation]);

  return { animation, triggerAnimation };
}
