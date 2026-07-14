import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import "../../Styles/components/Header.css";

const Header = () => {
  const { username, setIsProfileOpen } = useUser();
  return (
    <header className="header-container fade-in">
      <div className="header-top">
        <button className="header-profile-avatar" onClick={() => setIsProfileOpen(true)}>
          {username ? username.charAt(0).toUpperCase() : 'H'}
        </button>
        <button className="icon-btn notification-btn" aria-label="Notifications">
          <Bell size={24} className="icon-svg" />
          <span className="notification-badge">1</span>
        </button>
      </div>
      <div className="header-greeting">
        <h1 className="greeting-title">
          Good Morning, {username}! <span className="wave-emoji">👋</span>
        </h1>
        <p className="greeting-subtitle">Stay consistent, stay unstoppable.</p>
      </div>
    </header>
  );
};

export default Header;
