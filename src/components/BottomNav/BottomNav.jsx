import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, BarChart2, BookOpen, User } from 'lucide-react';
import "../../Styles/components/BottomNav.css";

const BottomNav = () => {
  const navItems = [
    { id: 'tracker', label: 'Tracker', path: '/', icon: <Home size={20} /> },
    { id: 'efforts', label: 'Efforts', path: '/efforts', icon: <ClipboardList size={20} /> },
    { id: 'results', label: 'Results', path: '/results', icon: <BarChart2 size={20} /> },
    { id: 'resources', label: 'Resources', path: '/resources', icon: <BookOpen size={20} /> },
    { id: 'support', label: 'Support', path: '/support', icon: <User size={20} /> },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <div className="nav-icon-wrapper">
            {item.icon}
          </div>
          <span className="nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
