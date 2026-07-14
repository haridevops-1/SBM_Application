import React, { useState } from 'react';
import { Menu, Calendar, Utensils, Dumbbell, Moon, Brain, Droplet, ArrowUpRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import "../../Styles/pages/Efforts.css";

const Efforts = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('week');
  const [activeCategory, setActiveCategory] = useState('nutrition');

  // Load global user state context
  const { 
    todayEffortLogged,
    nutritionScore,
    movementScore,
    recoveryScore,
    mindsetScore,
    hydrationScore,
    weeklyEfforts,
    setIsProfileOpen,
    username
  } = useUser();

  // Timeframe selector options
  const timeframes = ['Week', 'Month', 'Year'];

  // Overall progress metrics
  const overallMetrics = [
    { label: 'Effort Score', value: todayEffortLogged ? '78%' : '68%' },
    { label: 'Completed', value: todayEffortLogged ? '8/9' : '7/9' },
    { label: 'Consistency', value: todayEffortLogged ? '78%' : '68%' },
    { label: 'Points', value: todayEffortLogged ? '780' : '680' }
  ];

  // Overall progress chart data (weekly)
  const overallChartData = [
    { day: 'Mon', percentage: weeklyEfforts[0], isToday: false },
    { day: 'Tue', percentage: weeklyEfforts[1], isToday: false },
    { day: 'Wed', percentage: weeklyEfforts[2], isToday: false },
    { day: 'Thu', percentage: weeklyEfforts[3], isToday: false },
    { day: 'Fri', percentage: weeklyEfforts[4], isToday: true } // Friday is Friday weeklyEfforts value
  ];

  // Daily Questions category cards data
  const categories = [
    {
      id: 'nutrition',
      label: 'Nutrition',
      score: `${nutritionScore}/9`,
      icon: <Utensils size={20} />,
      colorClass: 'nutrition-card',
      titleFull: 'Nutrition & Meals'
    },
    {
      id: 'movement',
      label: 'Movement',
      score: `${movementScore}/9`,
      icon: <Dumbbell size={20} />,
      colorClass: 'movement-card',
      titleFull: 'Movement & Exercise'
    },
    {
      id: 'recovery',
      label: 'Recovery',
      score: `${recoveryScore}/9`,
      icon: <Moon size={20} />,
      colorClass: 'recovery-card',
      titleFull: 'Recovery & Sleep'
    },
    {
      id: 'mindset',
      label: 'Mindset',
      score: `${mindsetScore}/9`,
      icon: <Brain size={20} />,
      colorClass: 'mindset-card',
      titleFull: 'Mindset & Focus'
    },
    {
      id: 'hydration',
      label: 'Hydration',
      score: `${hydrationScore}/9`,
      icon: <Droplet size={20} />,
      colorClass: 'hydration-card',
      titleFull: 'Hydration & Water'
    }
  ];

  // Detailed 7-day logs for each category
  const categoryDetailsData = {
    nutrition: [
      { day: 'Mon', percentage: 75 },
      { day: 'Tue', percentage: 45 },
      { day: 'Wed', percentage: 80 },
      { day: 'Thu', percentage: 45 },
      { day: 'Fri', percentage: 85 },
      { day: 'Sat', percentage: 35 },
      { day: 'Sun', percentage: 78 }
    ],
    movement: [
      { day: 'Mon', percentage: 50 },
      { day: 'Tue', percentage: 80 },
      { day: 'Wed', percentage: 60 },
      { day: 'Thu', percentage: 75 },
      { day: 'Fri', percentage: 90 },
      { day: 'Sat', percentage: 40 },
      { day: 'Sun', percentage: 30 }
    ],
    recovery: [
      { day: 'Mon', percentage: 90 },
      { day: 'Tue', percentage: 85 },
      { day: 'Wed', percentage: 70 },
      { day: 'Thu', percentage: 80 },
      { day: 'Fri', percentage: 85 },
      { day: 'Sat', percentage: 95 },
      { day: 'Sun', percentage: 90 }
    ],
    mindset: [
      { day: 'Mon', percentage: 60 },
      { day: 'Tue', percentage: 75 },
      { day: 'Wed', percentage: 80 },
      { day: 'Thu', percentage: 70 },
      { day: 'Fri', percentage: 65 },
      { day: 'Sat', percentage: 50 },
      { day: 'Sun', percentage: 85 }
    ],
    hydration: [
      { day: 'Mon', percentage: 80 },
      { day: 'Tue', percentage: 90 },
      { day: 'Wed', percentage: 75 },
      { day: 'Thu', percentage: 85 },
      { day: 'Fri', percentage: 90 },
      { day: 'Sat', percentage: 60 },
      { day: 'Sun', percentage: 70 }
    ]
  };

  const selectedCategoryObj = categories.find(cat => cat.id === activeCategory);
  const activeDetailData = categoryDetailsData[activeCategory];

  return (
    <div className="efforts-page-container fade-in">
      {/* Top Header */}
      <header className="efforts-header">
        <div className="header-actions">
          <button className="header-profile-avatar" onClick={() => setIsProfileOpen(true)}>
            {username ? username.charAt(0).toUpperCase() : 'H'}
          </button>
          <h1 className="header-title">Efforts</h1>
          <button className="header-action-btn" aria-label="Calendar">
            <Calendar size={24} />
          </button>
        </div>
        <p className="header-subtitle">Keep pushing your limits! <span className="flex-emoji">💪</span></p>
      </header>

      {/* Section 1: Overall Progress */}
      <section className="overall-progress-card">
        <div className="progress-card-header">
          <h2 className="progress-title">Overall Progress</h2>
          <div className="timeframe-selector">
            {timeframes.map(tf => (
              <button
                key={tf}
                className={`timeframe-btn ${activeTimeframe === tf.toLowerCase() ? 'active' : ''}`}
                onClick={() => setActiveTimeframe(tf.toLowerCase())}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          {overallMetrics.map((metric, i) => (
            <div key={i} className="metric-box">
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="chart-wrapper">
          <div className="y-axis">
            <span>100%</span>
            <span>80%</span>
            <span>60%</span>
            <span>40%</span>
            <span>20%</span>
            <span>0%</span>
          </div>
          <div className="chart-area-container">
            {/* Grid background lines */}
            <div className="grid-lines">
              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>
            </div>
            
            {/* Bars */}
            <div className="bars-container">
              {overallChartData.map((data, index) => (
                <div key={index} className="bar-column">
                  <div className="bar-track">
                    <div 
                      className={`bar-fill ${data.isToday ? 'highlight-fill' : 'standard-fill'}`} 
                      style={{ height: `${data.percentage}%` }}
                    >
                      <span className="bar-tooltip">{data.percentage}%</span>
                    </div>
                  </div>
                  <span className="bar-label">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Daily Questions */}
      <section className="daily-questions-section">
        <div className="questions-header">
          <h2 className="questions-title">Daily Questions</h2>
          <button className="view-all-btn">View All</button>
        </div>
        
        {/* Horizontal Category Cards */}
        <div className="categories-row">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-toggle-card ${cat.colorClass} ${isSelected ? 'selected' : ''}`}
              >
                <div className="category-icon-circle">
                  {cat.icon}
                </div>
                <div className="category-meta">
                  <span className="category-name">{cat.label}</span>
                  <span className="category-score">{cat.score}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Section 3: Dynamic Category Details */}
      <section className={`category-details-card ${activeCategory}-active`}>
        <div className="details-header">
          <div className="details-title-wrapper">
            <div className="details-icon-circle">
              {selectedCategoryObj?.icon}
            </div>
            <h2 className="details-title">{selectedCategoryObj?.titleFull}</h2>
          </div>
          <button className="view-details-link">
            View Details <ArrowUpRight size={14} />
          </button>
        </div>

        {/* 7-Day Bar Chart */}
        <div className="chart-wrapper">
          <div className="y-axis">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          <div className="chart-area-container">
            {/* Grid background lines */}
            <div className="grid-lines-4">
              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>
              <div className="grid-line"></div>
            </div>
            
            {/* Bars */}
            <div className="bars-container">
              {activeDetailData.map((data, index) => (
                <div key={index} className="bar-column">
                  <div className="bar-track">
                    <div 
                      className="bar-fill category-accent-fill" 
                      style={{ height: `${data.percentage}%` }}
                    >
                      <span className="bar-tooltip">{data.percentage}%</span>
                    </div>
                  </div>
                  <span className="bar-label">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Efforts;
