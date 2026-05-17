import React, { useState, useEffect } from 'react';
import { RefreshCcw, MapPin, Globe2, Map } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import TimezoneCard from './components/TimezoneCard';

function App() {
  const [theme, setTheme] = useState('dark');
  const [baseDate, setBaseDate] = useState(new Date());
  const [isManualOverride, setIsManualOverride] = useState(false);

  // Apply theme to document body
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  // Live clock effect
  useEffect(() => {
    if (isManualOverride) return;

    // Update time every second
    const interval = setInterval(() => {
      setBaseDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [isManualOverride]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleTimeChange = (newDate) => {
    setBaseDate(newDate);
    setIsManualOverride(true);
  };

  const resetToCurrent = () => {
    setBaseDate(new Date());
    setIsManualOverride(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Clocker</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <TimezoneCard 
          title="Pacific Time (PDT/PST)" 
          timezone="America/Los_Angeles"
          icon={MapPin}
          currentDate={baseDate}
          onTimeChange={handleTimeChange}
        />
        
        <TimezoneCard 
          title="Central Time (CDT/CST)" 
          timezone="America/Chicago"
          icon={Map}
          currentDate={baseDate}
          onTimeChange={handleTimeChange}
        />
        
        <TimezoneCard 
          title="Indian Time (IST)" 
          timezone="Asia/Kolkata"
          icon={Globe2}
          currentDate={baseDate}
          onTimeChange={handleTimeChange}
        />
      </main>

      <div className="actions">
        <button 
          className="reset-btn" 
          onClick={resetToCurrent}
          disabled={!isManualOverride}
        >
          <RefreshCcw size={16} />
          Reset to Current Time
        </button>
      </div>
    </div>
  );
}

export default App;
