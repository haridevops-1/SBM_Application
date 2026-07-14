import React from 'react';
import { Calendar } from 'lucide-react';
import Header from '../../components/Header/Header';
import QuoteBanner from '../../components/QuoteBanner/QuoteBanner';
import InProgressCard from '../../components/InProgressCard/InProgressCard';
import SbmCards from '../../components/SbmCards/SbmCards';
import DailyActions from '../../components/DailyActions/DailyActions';
import "../../Styles/pages/Home.css";

const Home = () => {
  // Format standard date or use mockup date
  const dateString = "Sunday, 13 July 2025";

  return (
    <div className="home-page-container">
      {/* Top Header */}
      <Header username="Harish" />

      {/* Quote Banner */}
      <QuoteBanner />

      {/* Date Row */}
      <div className="date-row fade-in">
        <Calendar size={18} className="calendar-icon" />
        <span className="date-text">{dateString}</span>
      </div>

      {/* Today's Progress Card */}
      <InProgressCard score={78} streak={12} weightChange={-0.8} />

      {/* SBM Score Section */}
      <SbmCards />

      {/* Daily Actions Grid */}
      <DailyActions />
    </div>
  );
};

export default Home;
