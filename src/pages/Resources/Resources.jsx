import React, { useState } from 'react';
import { Menu, Bell, Search, Play, X, Calendar } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import "../../Styles/pages/Resources.css";

const Resources = () => {
  const { username, setIsProfileOpen } = useUser();

  // States
  const [activeFilter, setActiveFilter] = useState('strength workout');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  // Filters config matching the mockup exactly
  const filters = [
    { key: 'action plan', label: 'Action Plan' },
    { key: 'strength workout', label: 'Strength Workout' },
    { key: 'guides', label: 'Guides' },
    { key: 'webinar', label: 'Webinar' }
  ];

  // Resources datasets with realistic video preview cards
  const resourcesList = [
    // Strength Workouts
    {
      id: 1,
      title: 'Week 16 Day 3 | Strength Workout',
      date: '10-May-2026',
      category: 'strength workout',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      // High-quality unsplash workout image
      thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Week 16 Day 2 | Strength Workout',
      date: '08-May-2026',
      category: 'strength workout',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      // High-quality pushup/exercise image
      thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Week 16 Day 1 | Strength Workout',
      date: '06-May-2026',
      category: 'strength workout',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop'
    },
    // Action Plans
    {
      id: 4,
      title: 'Slow Burn Phase 1 Action Plan',
      date: '01-May-2026',
      category: 'action plan',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=600&auto=format&fit=crop'
    },
    // Guides
    {
      id: 5,
      title: 'Full Guide: Caloric Deficit & Nutrition',
      date: '28-Apr-2026',
      category: 'guides',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop'
    },
    // Webinars
    {
      id: 6,
      title: 'Monthly Q&A: Overcoming Weight Plateaus',
      date: '15-Apr-2026',
      category: 'webinar',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAppliedSearch(searchQuery.trim().toLowerCase());
  };

  // Filter and search query processing
  const filteredResources = resourcesList.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch =
      appliedSearch === '' ||
      item.title.toLowerCase().includes(appliedSearch) ||
      item.category.toLowerCase().includes(appliedSearch);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="resources-page-container fade-in">
      {/* Top Header */}
      <header className="resources-header">
        <div className="header-actions-row">
          <button className="header-profile-avatar" onClick={() => setIsProfileOpen(true)}>
            {username ? username.charAt(0).toUpperCase() : 'H'}
          </button>
          <h1 className="header-title-text centered-title">Resources</h1>
          <button className="bell-btn" aria-label="Notifications">
            <Bell size={24} />
            <span className="bell-badge">1</span>
          </button>
        </div>
      </header>

      {/* Search Input Bar */}
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <div className="search-input-wrapper">
          <Search size={18} className="search-bar-icon" />
          <input
            type="text"
            className="search-input-field"
            placeholder="Search for resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="search-submit-btn">
          Search
        </button>
      </form>

      {/* Horizontal scrolling Filter buttons */}
      <div className="filters-tab-row">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`filter-tab-btn ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Vertical Video Cards List */}
      <div className="video-cards-grid">
        {filteredResources.length > 0 ? (
          filteredResources.map((item) => (
            <div 
              key={item.id} 
              className="video-resource-card fade-in" 
              onClick={() => setActiveVideo(item)}
            >
              {/* Top Thumbnail Image */}
              <div className="video-thumbnail-wrapper">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="video-thumbnail-img"
                  loading="lazy"
                />
                <div className="video-play-overlay">
                  <div className="play-button-ring">
                    <Play size={20} fill="white" color="white" className="play-icon-svg" />
                  </div>
                </div>
              </div>

              {/* Bottom Metadata Info */}
              <div className="video-card-details">
                <h3 className="video-card-title">{item.title}</h3>
                <div className="video-card-date-row">
                  <Calendar size={12} className="date-icon-svg" />
                  <span className="video-card-date">{item.date}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-results-box fade-in">
            <p>No resources found matching your query.</p>
            <button 
              className="clear-search-btn" 
              onClick={() => { setSearchQuery(''); setAppliedSearch(''); setActiveFilter('strength workout'); }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Live Video Modal Overlay Player */}
      {activeVideo && (
        <div className="video-player-modal-overlay" onClick={() => setActiveVideo(null)}>
          <div className="video-player-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close-btn" onClick={() => setActiveVideo(null)}>
              <X size={20} />
            </button>
            <div className="video-viewport-wrapper">
              <h3 className="video-modal-title">{activeVideo.title}</h3>
              <video 
                src={activeVideo.videoUrl} 
                controls 
                autoPlay 
                className="modal-video-tag"
              />
              <div className="video-modal-meta-row">
                <Calendar size={12} />
                <span>Uploaded: {activeVideo.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
