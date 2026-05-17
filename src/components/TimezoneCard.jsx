import React from 'react';
import { format, parse } from 'date-fns';
import { formatInTimeZone, toDate } from 'date-fns-tz';

export default function TimezoneCard({ 
  title, 
  timezone, 
  icon: Icon,
  currentDate, 
  onTimeChange 
}) {
  // Format the time as HH:mm for the input value
  const timeString = formatInTimeZone(currentDate, timezone, 'HH:mm');
  
  // Format the date for display (e.g., "Mon, Oct 24")
  const dateString = formatInTimeZone(currentDate, timezone, 'E, MMM d');

  const handleTimeChange = (e) => {
    const newTimeString = e.target.value; // "HH:mm"
    if (!newTimeString) return;

    // We need to construct a new Date object representing this new time IN the given timezone.
    // First, parse the time on the current day in that timezone.
    // Get the current date string in that timezone
    const datePart = formatInTimeZone(currentDate, timezone, 'yyyy-MM-dd');
    const dateTimeString = `${datePart} ${newTimeString}`;
    
    // Parse it back to a global Date object
    const newGlobalDate = toDate(dateTimeString, { timeZone: timezone });
    
    onTimeChange(newGlobalDate);
  };

  return (
    <div className="timezone-card">
      <div className="card-header">
        <div className="card-title">
          <Icon size={20} color="var(--icon-color)" />
          {title}
        </div>
        <div className="card-date">
          {dateString}
        </div>
      </div>
      <div className="card-body">
        <div className="time-input-wrapper">
          <input 
            type="time" 
            className="time-input" 
            value={timeString} 
            onChange={handleTimeChange}
            required
          />
        </div>
      </div>
    </div>
  );
}
