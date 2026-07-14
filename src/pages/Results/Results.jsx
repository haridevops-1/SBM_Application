import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, Scale, ArrowDownRight, ArrowUpRight, Activity, Dumbbell, ClipboardList, Utensils, Cookie } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import "../../Styles/pages/Results.css";

const Results = () => {
  // Load global user context
  const { startWeight, loggedWeight, todayEffortLogged, username, setIsProfileOpen } = useUser();

  // State for active metric: 'weight' | 'fat' | 'muscle'
  const [activeMetric, setActiveMetric] = useState('weight');
  
  // State for line chart selected node index (0-6)
  const [selectedPointIndex, setSelectedPointIndex] = useState(6);
  
  // States for dropdown selections
  const [chartTimeframe, setChartTimeframe] = useState('7days');
  const [headerTimeframe, setHeaderTimeframe] = useState('week');
  const [foodTimeframe, setFoodTimeframe] = useState('week');

  // States to toggle dropdown visibility
  const [headerDropdownOpen, setHeaderDropdownOpen] = useState(false);
  const [chartDropdownOpen, setChartDropdownOpen] = useState(false);
  const [foodDropdownOpen, setFoodDropdownOpen] = useState(false);

  // Dynamic calculations for weight changes
  const netWeightChange = parseFloat((loggedWeight - startWeight).toFixed(1));
  const pctWeightChange = parseFloat(((netWeightChange / startWeight) * 100).toFixed(1));

  // Dynamic coordinate for today's weight node (clamped to SVG view limits)
  const todayWeightY = Math.max(25, Math.min(130, Math.round(100 - ((loggedWeight - 71) / 10.2) * 65)));

  // Dynamic Dataset config mapping
  const datasets = {
    weight: {
      title: 'Body Weight (kg)',
      unit: 'kg',
      color: '#B085F5',
      themeClass: 'purple-theme',
      yLabels: [85, 75, 65, 55, 45, 35],
      startValue: `${startWeight} kg`,
      currentValue: `${loggedWeight} kg`,
      change: `${netWeightChange > 0 ? '+' : ''}${netWeightChange} kg`,
      changePercent: `${netWeightChange > 0 ? '+' : ''}${pctWeightChange}%`,
      changeIsNegative: netWeightChange <= 0,
      timeframes: {
        '7days': [
          { day: '11 Jul', val: 71.0, x: 40, y: 100 },
          { day: '12 Jul', val: 70.5, x: 95, y: 105 },
          { day: '13 Jul', val: 71.0, x: 150, y: 100 },
          { day: '14 Jul', val: 72.5, x: 205, y: 88 },
          { day: '15 Jul', val: 81.2, x: 260, y: 35 },
          { day: '16 Jul', val: 80.5, x: 315, y: 40 },
          { day: '17 Jul', val: loggedWeight, x: 370, y: todayWeightY }
        ],
        '30days': [
          { day: '18 Jun', val: 81.0, x: 40, y: 35 },
          { day: '23 Jun', val: 80.2, x: 95, y: 41 },
          { day: '28 Jun', val: 79.5, x: 150, y: 48 },
          { day: '3 Jul', val: 79.0, x: 205, y: 55 },
          { day: '8 Jul', val: 78.2, x: 260, y: 62 },
          { day: '13 Jul', val: 78.5, x: 315, y: 60 },
          { day: '17 Jul', val: loggedWeight, x: 370, y: todayWeightY }
        ]
      }
    },
    fat: {
      title: 'Body Fat (%)',
      unit: '%',
      color: '#FF4081',
      themeClass: 'pink-theme',
      yLabels: [30, 28, 26, 24, 22, 20],
      startValue: '25.0 %',
      currentValue: todayEffortLogged ? '23.4 %' : '23.6 %',
      change: todayEffortLogged ? '-1.6 %' : '-1.4 %',
      changePercent: todayEffortLogged ? '-6.4%' : '-5.6%',
      changeIsNegative: true,
      timeframes: {
        '7days': [
          { day: '11 Jul', val: 25.0, x: 40, y: 95 },
          { day: '12 Jul', val: 24.8, x: 95, y: 98 },
          { day: '13 Jul', val: 24.2, x: 150, y: 107 },
          { day: '14 Jul', val: 24.0, x: 205, y: 110 },
          { day: '15 Jul', val: 23.8, x: 260, y: 113 },
          { day: '16 Jul', val: 23.6, x: 315, y: 116 },
          { day: '17 Jul', val: todayEffortLogged ? 23.4 : 23.6, x: 370, y: todayEffortLogged ? 119 : 116 }
        ],
        '30days': [
          { day: '18 Jun', val: 26.5, x: 40, y: 72 },
          { day: '23 Jun', val: 25.8, x: 95, y: 82 },
          { day: '28 Jun', val: 25.2, x: 150, y: 92 },
          { day: '3 Jul', val: 24.8, x: 205, y: 98 },
          { day: '8 Jul', val: 24.2, x: 260, y: 107 },
          { day: '13 Jul', val: 23.8, x: 315, y: 113 },
          { day: '17 Jul', val: todayEffortLogged ? 23.4 : 23.6, x: 370, y: todayEffortLogged ? 119 : 116 }
        ]
      }
    },
    muscle: {
      title: 'Muscle Mass (kg)',
      unit: 'kg',
      color: '#4CAF50',
      themeClass: 'green-theme',
      yLabels: [60, 58, 56, 54, 52, 50],
      startValue: '54.9 kg',
      currentValue: todayEffortLogged ? '56.1 kg' : '55.9 kg',
      change: todayEffortLogged ? '+1.2 kg' : '+1.0 kg',
      changePercent: todayEffortLogged ? '+2.2%' : '+1.8%',
      changeIsNegative: false,
      timeframes: {
        '7days': [
          { day: '11 Jul', val: 54.9, x: 40, y: 120 },
          { day: '12 Jul', val: 55.1, x: 95, y: 117 },
          { day: '13 Jul', val: 55.3, x: 150, y: 114 },
          { day: '14 Jul', val: 55.5, x: 205, y: 110 },
          { day: '15 Jul', val: 55.8, x: 260, y: 105 },
          { day: '16 Jul', val: 56.0, x: 315, y: 102 },
          { day: '17 Jul', val: todayEffortLogged ? 56.1 : 55.9, x: 370, y: todayEffortLogged ? 100 : 102 }
        ],
        '30days': [
          { day: '18 Jun', val: 53.5, x: 40, y: 140 },
          { day: '23 Jun', val: 54.2, x: 95, y: 130 },
          { day: '28 Jun', val: 54.8, x: 150, y: 121 },
          { day: '3 Jul', val: 55.2, x: 205, y: 114 },
          { day: '8 Jul', val: 55.5, x: 260, y: 110 },
          { day: '13 Jul', val: 55.8, x: 315, y: 105 },
          { day: '17 Jul', val: todayEffortLogged ? 56.1 : 55.9, x: 370, y: todayEffortLogged ? 100 : 102 }
        ]
      }
    }
  };

  // Select active values based on state variables
  const activeSet = datasets[activeMetric];
  const chartPoints = activeSet.timeframes[chartTimeframe];
  
  // Ensure the selected point index is bound inside the timeframe array size
  const activeIndex = Math.min(selectedPointIndex, chartPoints.length - 1);
  const selectedPoint = chartPoints[activeIndex];

  // Calculate paths
  const linePath = chartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L 370 140 L 40 140 Z`;

  // Progress overview list configurations
  const progressOverviewList = [
    { id: 'weight', label: 'Body Weight', unit: 'kg', value: `${loggedWeight} kg`, change: `${netWeightChange > 0 ? '+' : ''}${netWeightChange} kg`, icon: <Scale size={18} />, colorClass: 'purple-theme', barHeights: [30, 45, 60, 45, 70, 55] },
    { id: 'fat', label: 'Body Fat', unit: '%', value: todayEffortLogged ? '23.4 %' : '23.6 %', change: todayEffortLogged ? '-1.6 %' : '-1.4 %', icon: <Activity size={18} />, colorClass: 'pink-theme', barHeights: [40, 50, 45, 75, 50, 60] },
    { id: 'muscle', label: 'Muscle Mass', unit: 'kg', value: todayEffortLogged ? '56.1 kg' : '55.9 kg', change: todayEffortLogged ? '+1.2 kg' : '+1.0 kg', icon: <Dumbbell size={18} />, colorClass: 'green-theme', barHeights: [25, 65, 55, 45, 50, 65] }
  ];

  // Relationship with Food dynamic ratings
  const foodData = {
    week: [
      { label: 'Mindful Eating', sublabel: 'Rating', score: '7/10', status: 'Good', percentage: 70, icon: <ClipboardList size={18} />, colorClass: 'pink-rating', statusClass: 'status-good' },
      { label: 'Food Choices', sublabel: 'Rating', score: '6/10', status: 'Average', percentage: 60, icon: <Utensils size={18} />, colorClass: 'orange-rating', statusClass: 'status-average' },
      { label: 'Cravings Control', sublabel: 'Rating', score: '6/10', status: 'Average', percentage: 60, icon: <Cookie size={18} />, colorClass: 'orange-rating', statusClass: 'status-average' }
    ],
    month: [
      { label: 'Mindful Eating', sublabel: 'Rating', score: '8/10', status: 'Excellent', percentage: 80, icon: <ClipboardList size={18} />, colorClass: 'pink-rating', statusClass: 'status-good' },
      { label: 'Food Choices', sublabel: 'Rating', score: '7/10', status: 'Good', percentage: 70, icon: <Utensils size={18} />, colorClass: 'pink-rating', statusClass: 'status-good' },
      { label: 'Cravings Control', sublabel: 'Rating', score: '5/10', status: 'Needs Work', percentage: 50, icon: <Cookie size={18} />, colorClass: 'orange-rating', statusClass: 'status-average' }
    ]
  };

  const activeFoodItems = foodData[foodTimeframe];

  // Tooltip dynamic color
  const metricColor = activeSet.color;

  return (
    <div className="results-page-container fade-in">
      {/* Top Header */}
      <header className="results-header">
        <div className="header-top-row">
          <button className="header-profile-avatar" onClick={() => setIsProfileOpen(true)}>
            {username ? username.charAt(0).toUpperCase() : 'H'}
          </button>
          <button className="icon-btn notification-btn" aria-label="Notifications">
            <Bell size={24} />
            <span className="notification-badge">1</span>
          </button>
        </div>
        <div className="header-greeting-row">
          <div>
            <h1 className="greeting-title">
              Good Morning, {username}! <span className="wave-emoji">👋</span>
            </h1>
            <p className="greeting-subtitle">Let's see your progress and results.</p>
          </div>
          <div className="dropdown-wrapper">
            <button 
              className="dropdown-filter-btn"
              onClick={() => setHeaderDropdownOpen(!headerDropdownOpen)}
            >
              {headerTimeframe === 'week' ? 'This Week' : 'This Month'} <ChevronDown size={14} />
            </button>
            {headerDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => { setHeaderTimeframe('week'); setHeaderDropdownOpen(false); }}>This Week</button>
                <button onClick={() => { setHeaderTimeframe('month'); setHeaderDropdownOpen(false); }}>This Month</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Body Weight Graph Section */}
      <section className="weight-graph-card">
        <div className="graph-card-header">
          <div className="graph-title-wrapper">
            <div className="graph-icon-container" style={{ color: metricColor, background: `${metricColor}1A` }}>
              {activeMetric === 'weight' && <Scale size={20} />}
              {activeMetric === 'fat' && <Activity size={20} />}
              {activeMetric === 'muscle' && <Dumbbell size={20} />}
            </div>
            <h2 className="graph-title">{activeSet.title}</h2>
          </div>
          
          <div className="dropdown-wrapper">
            <button 
              className="graph-dropdown-btn"
              onClick={() => setChartDropdownOpen(!chartDropdownOpen)}
            >
              {chartTimeframe === '7days' ? '7 Days' : '30 Days'} <ChevronDown size={14} />
            </button>
            {chartDropdownOpen && (
              <div className="dropdown-menu bottom-menu">
                <button onClick={() => { setChartTimeframe('7days'); setChartDropdownOpen(false); }}>7 Days</button>
                <button onClick={() => { setChartTimeframe('30days'); setChartDropdownOpen(false); }}>30 Days</button>
              </div>
            )}
          </div>
        </div>

        {/* SVG Line Chart */}
        <div className="line-chart-wrapper">
          <div className="y-axis-labels">
            {activeSet.yLabels.map((lbl, idx) => (
              <span key={idx}>{lbl}</span>
            ))}
          </div>

          <div className="chart-drawing-area">
            {/* Grid horizontal lines */}
            <div className="grid-dashed-lines">
              {activeSet.yLabels.map((_, idx) => (
                <div key={idx} className="chart-grid-line"></div>
              ))}
            </div>

            {/* SVG Elements */}
            <svg viewBox="0 0 400 150" className="chart-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`grad-${activeMetric}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={metricColor} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={metricColor} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area path */}
              <path d={areaPath} fill={`url(#grad-${activeMetric})`} />

              {/* Line path */}
              <path d={linePath} fill="none" stroke={metricColor} strokeWidth="3.5" strokeLinecap="round" />

              {/* Interactive Data points */}
              {chartPoints.map((p, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <circle
                    key={idx}
                    cx={p.x}
                    cy={p.y}
                    r={isActive ? "6.5" : "5.5"}
                    fill={isActive ? "#FFF" : metricColor}
                    stroke={isActive ? metricColor : "none"}
                    strokeWidth={isActive ? "2.5" : "0"}
                    onClick={() => setSelectedPointIndex(idx)}
                    onMouseEnter={() => setSelectedPointIndex(idx)}
                    style={{ cursor: 'pointer', filter: isActive ? `drop-shadow(0px 0px 6px ${metricColor})` : 'none' }}
                  />
                );
              })}
            </svg>

            {/* Active Tooltip on selected node */}
            {selectedPoint && (
              <div 
                className="chart-tooltip-box" 
                style={{ 
                  left: `${selectedPoint.x - 45}px`, 
                  top: `${selectedPoint.y - 48}px`,
                  borderColor: metricColor
                }}
              >
                <span className="tooltip-date">{selectedPoint.day}</span>
                <div className="tooltip-value-row">
                  <span className="tooltip-color-indicator" style={{ backgroundColor: metricColor }}></span>
                  <span className="tooltip-value-text">{selectedPoint.val} {activeSet.unit}</span>
                </div>
              </div>
            )}

            {/* X-axis date labels */}
            <div className="x-axis-labels">
              {chartPoints.map((p, idx) => (
                <span 
                  key={idx} 
                  style={{ 
                    left: `${p.x - 12}px`, 
                    color: idx === activeIndex ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    fontWeight: idx === activeIndex ? '700' : '600',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedPointIndex(idx)}
                >
                  {p.day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick summary stats bar */}
        <div className="summary-stats-grid">
          <div className="summary-stat-box">
            <div className="summary-icon-circle purple-bg" style={{ color: metricColor, background: `${metricColor}26` }}>
              {activeMetric === 'weight' && <Scale size={14} />}
              {activeMetric === 'fat' && <Activity size={14} />}
              {activeMetric === 'muscle' && <Dumbbell size={14} />}
            </div>
            <span className="summary-value">{activeSet.startValue}</span>
            <span className="summary-label">Start</span>
          </div>

          <div className="summary-stat-box">
            <div className="summary-icon-circle purple-bg" style={{ color: metricColor, background: `${metricColor}26` }}>
              {activeMetric === 'weight' && <Scale size={14} />}
              {activeMetric === 'fat' && <Activity size={14} />}
              {activeMetric === 'muscle' && <Dumbbell size={14} />}
            </div>
            <span className="summary-value">{activeSet.currentValue}</span>
            <span className="summary-label">Current</span>
          </div>

          <div className="summary-stat-box">
            <div className="summary-icon-circle green-bg">
              {activeSet.changeIsNegative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
            </div>
            <span className="summary-value green-text">{activeSet.change}</span>
            <span className="summary-label">Change</span>
          </div>

          <div className="summary-stat-box">
            <div className="summary-icon-circle green-bg">
              {activeSet.changeIsNegative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
            </div>
            <span className="summary-value green-text">{activeSet.changePercent}</span>
            <span className="summary-label">Change %</span>
          </div>
        </div>
      </section>

      {/* Your Progress Overview */}
      <section className="progress-overview-card">
        <div className="overview-header">
          <div className="overview-title-wrapper">
            <div className="overview-icon-container">
              <Activity size={20} color="#B085F5" />
            </div>
            <h2 className="overview-title">Your Progress Overview</h2>
          </div>
        </div>

        {/* Progress rows */}
        <div className="progress-rows-list">
          {progressOverviewList.map((row) => {
            const isSelected = activeMetric === row.id;
            return (
              <div 
                key={row.id} 
                className={`progress-row-item ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                  setActiveMetric(row.id);
                  setSelectedPointIndex(datasets[row.id].timeframes[chartTimeframe].length - 1); // Select last point automatically on change
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="row-info">
                  <div className={`row-icon-wrapper ${row.colorClass}`}>
                    {row.icon}
                  </div>
                  <div className="row-text">
                    <span className="row-title">{row.label}</span>
                    <span className="row-unit">{row.unit}</span>
                  </div>
                </div>

                {/* Miniature bar graph */}
                <div className="mini-bars-graph">
                  {row.barHeights.map((h, idx) => (
                    <div
                      key={idx}
                      className={`mini-bar-fill ${row.colorClass}-bar`}
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>

                <div className="row-values">
                  <span className="row-current-val">{row.value}</span>
                  <span className="row-change-val green-text">{row.change}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Relationship with Food */}
      <section className="food-relationship-card">
        <div className="food-header">
          <div className="food-title-wrapper">
            <div className="food-icon-container">
              <Utensils size={20} color="#FF4081" />
            </div>
            <h2 className="food-title">Relationship with Food</h2>
          </div>
          <div className="dropdown-wrapper">
            <button 
              className="graph-dropdown-btn"
              onClick={() => setFoodDropdownOpen(!foodDropdownOpen)}
            >
              {foodTimeframe === 'week' ? 'This Week' : 'This Month'} <ChevronDown size={14} />
            </button>
            {foodDropdownOpen && (
              <div className="dropdown-menu bottom-menu">
                <button onClick={() => { setFoodTimeframe('week'); setFoodDropdownOpen(false); }}>This Week</button>
                <button onClick={() => { setFoodTimeframe('month'); setFoodDropdownOpen(false); }}>This Month</button>
              </div>
            )}
          </div>
        </div>

        {/* Progress sliders list */}
        <div className="food-sliders-list">
          {activeFoodItems.map((item, idx) => (
            <div key={idx} className="food-slider-item">
              <div className="slider-info">
                <div className="slider-left">
                  <div className="slider-icon-box">
                    {item.icon}
                  </div>
                  <div className="slider-text">
                    <span className="slider-title">{item.label}</span>
                    <span className="slider-sublabel">{item.sublabel}</span>
                  </div>
                </div>
                <div className="slider-right">
                  <span className="slider-score">{item.score}</span>
                  <span className={`slider-status ${item.statusClass}`}>{item.status}</span>
                </div>
              </div>

              {/* Progress Slider Track */}
              <div className="slider-track-container">
                <div className="slider-track-bg">
                  <div 
                    className={`slider-track-fill ${item.colorClass}`} 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Results;
