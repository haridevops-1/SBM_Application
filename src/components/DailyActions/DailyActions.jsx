import React, { useState } from 'react';
import { Check, Scale, X } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import "../../Styles/components/DailyActions.css";

const DailyActions = () => {
  // Connect to global UserContext
  const { 
    todayEffortLogged, 
    todayWeightLogged, 
    loggedWeight, 
    toggleTodayEffort, 
    logWeight 
  } = useUser();

  // State for inline weight form
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [weightInputValue, setWeightInputValue] = useState(loggedWeight.toString());

  // SVG parameters
  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const todayEffortPercent = todayEffortLogged ? 100 : 0;
  const last7DaysEffortPercent = todayEffortLogged ? 14 : 0;
  const strokeDashoffset = circumference - (todayEffortPercent / 100) * circumference;

  const handleLogEffortClick = () => {
    if (!todayEffortLogged) {
      toggleTodayEffort();
    }
  };

  const handleWeightSubmit = (e) => {
    e.preventDefault();
    if (weightInputValue.trim() !== '') {
      logWeight(weightInputValue);
      setShowWeightInput(false);
    }
  };

  return (
    <div className="daily-actions-container fade-in">
      {/* Your Effort Scores Heading */}
      <h2 className="tracker-subheading">Your Effort Scores</h2>

      {/* Effort Scores Progress Card */}
      <div className="effort-scores-card">
        {/* SVG Circular Gauge */}
        <div className="effort-gauge-wrapper">
          <svg className="effort-gauge-svg" viewBox="0 0 120 120">
            <circle
              className="gauge-track"
              cx="60"
              cy="60"
              r={radius}
              strokeWidth={strokeWidth}
            />
            <circle
              className="gauge-fill"
              cx="60"
              cy="60"
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="gauge-center-text">
            <span className="gauge-percent">{todayEffortPercent}%</span>
            <span className="gauge-label">Today's Effort</span>
          </div>
        </div>

        {/* Divider line */}
        <div className="effort-card-divider"></div>

        {/* Split Stats Footer */}
        <div className="effort-split-stats">
          <div className="split-stat-box">
            <span className="split-value">69%</span>
            <span className="split-label">Pre-SBM effort</span>
          </div>
          <div className="vertical-stat-line"></div>
          <div className="split-stat-box">
            <span className="split-value">{last7DaysEffortPercent}%</span>
            <span className="split-label">Last 7 days effort</span>
          </div>
        </div>
      </div>

      {/* Daily Actions Heading */}
      <h2 className="tracker-subheading">Daily Actions</h2>

      {/* Stacked action buttons */}
      <div className="action-buttons-stack">
        {/* Log Effort Button */}
        <button 
          className={`stacked-action-btn ${todayEffortLogged ? 'logged-red' : 'green-default'}`} 
          onClick={handleLogEffortClick}
          disabled={todayEffortLogged}
        >
          <div className="btn-icon-box">
            <Check size={18} className="btn-action-icon" />
          </div>
          <span className="btn-text">
            {todayEffortLogged ? "Today's effort logged!" : "Log today's effort"}
          </span>
        </button>

        {/* Log Weight Button */}
        <button 
          className={`stacked-action-btn ${todayWeightLogged ? 'logged-red' : 'green-default'}`}
          onClick={() => {
            if (!todayWeightLogged) {
              setWeightInputValue(loggedWeight.toString());
              setShowWeightInput(!showWeightInput); // Toggle inline form
            }
          }}
          disabled={todayWeightLogged}
        >
          <div className="btn-icon-box">
            <Scale size={18} className="btn-action-icon" />
          </div>
          <span className="btn-text">
            {todayWeightLogged ? `Today's weight logged (${loggedWeight} kg)` : "Log today's weight"}
          </span>
        </button>
      </div>

      {/* Inline Weight Logger Card (Shows inside the same page flow) */}
      {showWeightInput && !todayWeightLogged && (
        <div className="inline-weight-card fade-in">
          {/* Close button in top-right */}
          <button className="close-inline-btn" onClick={() => setShowWeightInput(false)}>
            <X size={18} />
          </button>
          
          <form onSubmit={handleWeightSubmit} className="weight-modal-form">
            <p className="modal-prompt-text">
              Enter today's weight to keep your log updated.
            </p>

            {/* Input field with white background, black text and native up/down arrows enabled */}
            <div className="mockup-weight-input-wrapper">
              <input 
                type="number" 
                step="0.1" 
                className="mockup-weight-input" 
                value={weightInputValue}
                onChange={(e) => setWeightInputValue(e.target.value)}
                placeholder="Enter your weight (kg)"
                autoFocus
                required
              />
            </div>

            {/* Solid Purple Submit Button */}
            <button type="submit" className="mockup-save-btn">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DailyActions;
