import React from 'react';
import { Power, Zap, Target, Trophy } from 'lucide-react';
import "../../Styles/components/SbmCards.css";

const SbmCards = () => {
  const cardsData = [
    {
      id: 1,
      score: "68%",
      title: "Pre-SBM Score",
      icon: <Power size={20} className="sbm-icon" />,
      colorClass: "purple-theme",
    },
    {
      id: 2,
      score: "81%",
      title: "Effort Score",
      icon: <Zap size={20} className="sbm-icon" />,
      colorClass: "blue-theme",
    },
    {
      id: 3,
      score: "76%",
      title: "Consistency",
      icon: <Target size={20} className="sbm-icon" />,
      colorClass: "teal-theme",
    },
    {
      id: 4,
      score: "75%",
      title: "SBM Score",
      icon: <Trophy size={20} className="sbm-icon" />,
      colorClass: "gold-theme",
    },
  ];

  return (
    <div className="sbm-section fade-in">
      <h2 className="section-title">SBM Score</h2>
      <div className="sbm-cards-grid">
        {cardsData.map((card) => (
          <div key={card.id} className={`sbm-card ${card.colorClass}`}>
            <div className="sbm-icon-wrapper">
              {card.icon}
            </div>
            <div className="sbm-info">
              <span className="sbm-score-value">{card.score}</span>
              <span className="sbm-card-title">{card.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SbmCards;
