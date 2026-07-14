import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { X, LogOut, Home, Flame, BarChart2, BookOpen, MessageSquare, Mail, Scale } from 'lucide-react';
import "../../Styles/components/ProfileDrawer.css";

const ProfileDrawer = () => {
  const {
    isProfileOpen,
    setIsProfileOpen,
    username,
    userId,
    userEmail,
    loggedWeight,
    userGoal,
    logoutUser
  } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  if (!isProfileOpen) return null;

  // Retrieve user initial for avatar badge
  const initialLetter = username ? username.charAt(0).toUpperCase() : 'H';

  // Navigation items mapping
  const menuItems = [
    { label: 'Tracker (Home)', path: '/', icon: <Home size={18} /> },
    { label: 'Efforts Log', path: '/efforts', icon: <Flame size={18} /> },
    { label: 'Results & Trends', path: '/results', icon: <BarChart2 size={18} /> },
    { label: 'Resources Library', path: '/resources', icon: <BookOpen size={18} /> },
    { label: 'Support & Help', path: '/support', icon: <MessageSquare size={18} /> }
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsProfileOpen(false); // Close drawer on navigation
  };

  return (
    <div className="profile-drawer-overlay" onClick={() => setIsProfileOpen(false)}>
      <div className="profile-drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* Header Row */}
        <header className="drawer-header">
          <div className="drawer-header-brand">
            <h2 className="drawer-title">Navigation Menu</h2>
          </div>
          <button className="drawer-close-btn" onClick={() => setIsProfileOpen(false)}>
            <X size={20} />
          </button>
        </header>

        {/* User Large Avatar Icon */}
        <div className="drawer-avatar-section">
          <div className="drawer-avatar-circle">
            {initialLetter}
          </div>
          <div className="avatar-meta-info">
            <h3 className="drawer-username">{username}</h3>
            <span className="drawer-userid-badge">{userId}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="drawer-section-divider"></div>

        {/* Drawer Navigation Options (Hamburger Menu Items) */}
        <div className="drawer-nav-section">
          <span className="drawer-section-label">Main Pages</span>
          <nav className="drawer-nav-list">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  className={`drawer-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.path)}
                >
                  <span className="nav-item-icon">{item.icon}</span>
                  <span className="nav-item-label">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Divider */}
        <div className="drawer-section-divider"></div>

        {/* User Details Details Info */}
        <div className="drawer-details-section">
          <span className="drawer-section-label">Account details</span>
          <div className="drawer-details-card">
            <div className="drawer-meta-row">
              <Mail size={14} className="meta-icon" />
              <div className="meta-texts">
                <span className="meta-label">Email</span>
                <span className="meta-value">{userEmail}</span>
              </div>
            </div>
            <div className="drawer-meta-row">
              <Scale size={14} className="meta-icon" />
              <div className="meta-texts">
                <span className="meta-label">Weight / Goal</span>
                <span className="meta-value">{loggedWeight} kg ({userGoal})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Action Button */}
        <div className="drawer-action-container">
          <button className="drawer-logout-btn" onClick={logoutUser}>
            <LogOut size={16} />
            <span>Log Out Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
