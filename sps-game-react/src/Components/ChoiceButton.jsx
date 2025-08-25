import React, { useState } from "react";

export default function ChoiceButton({ name, Icon, emoji, onChoose, disabled, darkMode }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setClicked(true);
    onChoose(name);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        group relative p-8 rounded-2xl border-2 transition-all duration-300 transform
        ${clicked ? "scale-125 rotate-3" : "hover:scale-110"}
        ${disabled 
          ? `opacity-50 cursor-not-allowed ${darkMode ? 'border-gray-600' : 'border-gray-400'}` 
          : `hover:shadow-xl ${darkMode 
              ? 'border-blue-400 hover:border-blue-500' 
              : 'border-blue-500 hover:border-blue-600'
            }`
        }
        ${darkMode 
          ? 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
          : 'bg-gradient-to-br from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800'
        }
        text-white shadow-lg
      `}
    >
      <div className="flex flex-col items-center gap-3">
        <Icon className={`text-4xl transition-transform duration-200 ${clicked ? "scale-125" : "group-hover:scale-110"}`} />
        <span className="text-xl font-bold">{name}</span>
        <span className="text-3xl">{emoji}</span>
      </div>
    </button>
  );
}
