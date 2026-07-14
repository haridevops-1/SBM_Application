import React from 'react';
import { Flame, Target, TrendingDown, ChevronRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import "../../Styles/components/InProgressCard.css";

const InProgressCard = () => {
  const { streakDays, todayEffortLogged, startWeight, loggedWeight } = useUser();
  
  // Dynamic scores depending on effort log status
  const score = todayEffortLogged ? 78 : 0;
  const streak = streakDays;
  const weightChange = parseFloat((loggedWeight - startWeight).toFixed(1));
  // SVG Circle parameters
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="in-progress-card fade-in">
      <div className="card-header">
        <h2 className="card-title">In Progress</h2>
        <button className="view-details-btn">
          View Details <ChevronRight size={16} />
        </button>
      </div>

      <div className="card-content">
        <div className="progress-circle-wrapper">
          <svg className="progress-svg" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#29B6F6" />
                <stop offset="100%" stopColor="#4CAF50" />
              </linearGradient>
            </defs>
            {/* Background Track */}
            <circle
              className="progress-track"
              cx="60"
              cy="60"
              r={radius}
              strokeWidth={strokeWidth}
            />
            {/* Foreground Fill */}
            <circle
              className="progress-fill"
              cx="60"
              cy="60"
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              stroke="url(#progressGradient)"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="progress-text-container">
            <span className="progress-percentage">{score}%</span>
            <span className="progress-label">Today Score</span>
          </div>
        </div>

        <div className="stats-list">
          <div className="stat-item">
            <div className="stat-icon-wrapper orange-icon">
              <Flame size={16} fill="var(--color-orange)" color="var(--color-orange)" />
            </div>
            <div className="stat-details">
              <span className="stat-label">Current Streak</span>
              <span className="stat-value">{streak} Days</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon-wrapper yellow-icon">
              <Target size={16} color="#FFEB3B" />
            </div>
            <div className="stat-details">
              <span className="stat-label">Today Score</span>
              <span className="stat-value">{score}%</span>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-icon-wrapper green-icon">
              <TrendingDown size={16} color="var(--color-green)" />
            </div>
            <div className="stat-details">
              <span className="stat-label">Weight Change</span>
              <span className="stat-sublabel">(vs last week)</span>
              <span className="stat-value green-text">{weightChange > 0 ? `+${weightChange}` : weightChange} kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InProgressCard;
