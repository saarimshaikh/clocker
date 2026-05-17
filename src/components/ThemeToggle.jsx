import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={24} color="var(--icon-color)" />
      ) : (
        <Moon size={24} color="var(--icon-color)" />
      )}
    </button>
  );
}
