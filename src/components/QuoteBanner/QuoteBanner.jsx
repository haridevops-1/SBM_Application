import React from 'react';
import { Star } from 'lucide-react';
import "../../Styles/components/QuoteBanner.css";

const QuoteBanner = () => {
  return (
    <div className="quote-banner-container fade-in">
      <div className="star-icon-container">
        <Star className="star-icon-svg" size={20} fill="#B085F5" color="#B085F5" />
      </div>
      <p className="quote-text">
        Every small effort today brings you closer to a stronger tomorrow.
      </p>
    </div>
  );
};

export default QuoteBanner;
