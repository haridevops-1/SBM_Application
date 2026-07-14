import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, MessageSquare, HelpCircle, Clock, Calendar, Mail, Phone, ChevronRight, X, Send, Heart } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import "../../Styles/pages/Support.css";

const Support = () => {
  const { username, setIsProfileOpen } = useUser();

  // Modal states
  const [chatOpen, setChatOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  
  // Chat messaging states
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi ${username}! 👋 How can I help you today on your fitness journey?`, isBot: true }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState(null);

  const chatEndRef = useRef(null);

  // Auto-scroll chat modal
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const faqs = [
    {
      q: "What is the Slow Burn Method?",
      a: "The Slow Burn Method is a science-based approach to sustainable fat loss, habit building, and strength retention through progressive resistance workouts, mindful nutrition, and consistent tracking."
    },
    {
      q: "How do I log my daily actions?",
      a: "Navigate to the Tracker (Home) tab and click the green buttons to record today's effort logs and input your current body weight."
    },
    {
      q: "When can I see my weight progress chart?",
      a: "Go to the Results tab (the chart icon) to view your body weight curve, current statistics, and fat loss progress overview charts."
    },
    {
      q: "What do the different score cards mean?",
      a: "Pre-SBM Score measures baseline scores, Effort Score represents daily actions completed, and Consistency measures your tracking compliance over the last 7 days."
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputVal.trim() === '') return;

    const userMessage = { id: Date.now(), text: inputVal, isBot: false };
    setMessages((prev) => [...prev, userMessage]);
    const typedQuery = inputVal.toLowerCase();
    setInputVal('');
    
    // Simulate bot typing
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "Thanks for reaching out! A coach will review your query and respond within 1 business day.";

      if (typedQuery.includes('hi') || typedQuery.includes('hello')) {
        replyText = "Hello! How can I assist you with your SBM plan today?";
      } else if (typedQuery.includes('workout') || typedQuery.includes('exercise')) {
        replyText = "Our Strength Workouts are scheduled 3 days a week. You can check details under the Resources tab!";
      } else if (typedQuery.includes('diet') || typedQuery.includes('nutrition') || typedQuery.includes('food')) {
        replyText = "Mindful eating is key! Check out the Nutrition Plan document in the Resources tab for full guidelines.";
      } else if (typedQuery.includes('weight') || typedQuery.includes('log')) {
        replyText = "You can log your weight under the Tracker (Home) tab, and view progress graphs in the Results tab.";
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, text: replyText, isBot: true }]);
      setIsTyping(false);
    }, 1200);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="support-page-container fade-in">
      {/* Top Header */}
      <header className="support-header">
        <div className="header-actions-row">
          <button className="header-profile-avatar" onClick={() => setIsProfileOpen(true)}>
            {username ? username.charAt(0).toUpperCase() : 'H'}
          </button>
          <h1 className="header-title-text centered-title">Support</h1>
          <button className="bell-btn" aria-label="Notifications">
            <Bell size={24} />
            <span className="bell-badge">1</span>
          </button>
        </div>
        <p className="header-subtitle-text">We're here to help you on your journey. <span className="heart-emoji">💜</span></p>
      </header>

      {/* Main Support Cards (Live Chat & FAQ) */}
      <div className="main-support-links">
        {/* Live Chat Card */}
        <div className="support-link-card" onClick={() => setChatOpen(true)}>
          <div className="card-left-info">
            <div className="support-icon-wrapper purple-glow">
              <MessageSquare size={22} fill="currentColor" />
            </div>
            <div className="support-text-details">
              <h2 className="support-card-title">Live Chat</h2>
              <p className="support-card-desc">Chat with our support team in real-time</p>
            </div>
          </div>
          <ChevronRight size={20} className="card-chevron" />
        </div>

        {/* FAQ Card */}
        <div className="support-link-card" onClick={() => setFaqOpen(true)}>
          <div className="card-left-info">
            <div className="support-icon-wrapper purple-glow">
              <HelpCircle size={22} />
            </div>
            <div className="support-text-details">
              <h2 className="support-card-title">FAQ</h2>
              <p className="support-card-desc">Find answers to common questions about the program</p>
            </div>
          </div>
          <ChevronRight size={20} className="card-chevron" />
        </div>
      </div>

      {/* Support Hours Card */}
      <section className="support-hours-card">
        <div className="hours-card-header">
          <Clock size={20} className="hours-icon" />
          <h2 className="hours-title">Support Hours</h2>
        </div>

        <div className="hours-table">
          <div className="hours-row">
            <span className="hours-day">Monday - Friday</span>
            <span className="hours-time">9:00 AM - 8:00 PM IST</span>
          </div>
          <div className="hours-row">
            <span className="hours-day">Saturday</span>
            <span className="hours-time">10:00 AM - 6:00 PM IST</span>
          </div>
          <div className="hours-row">
            <span className="hours-day">Sunday</span>
            <span className="hours-time status-closed">Closed</span>
          </div>
        </div>

        <p className="hours-disclaimer">
          Please give us 1 business day to respond to your queries. 
          If you don't hear back within that time, please inform your coach.
        </p>

        {/* Watermark SVG Headphones */}
        <svg className="headphones-watermark" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 15C30.67 15 15 30.67 15 50v20c0 5.52 4.48 10 10 10h5V55h-10v-5c0-16.57 13.43-30 30-30s30 13.43 30 30v5H70v25h5c5.52 0 10-4.48 10-10V50c0-19.33-15.67-30-35-30z" fill="rgba(123, 31, 162, 0.12)" />
        </svg>
      </section>

      {/* Other Ways to Reach Us Section */}
      <section className="reach-us-section">
        <h2 className="section-title">Other Ways to Reach Us</h2>
        <div className="reach-us-grid">
          {/* Email Us */}
          <a href="mailto:support@slowburnmethod.com" className="reach-card">
            <div className="reach-icon-box email-bg">
              <Mail size={18} />
            </div>
            <div className="reach-details">
              <span className="reach-heading">Email Us</span>
              <span className="reach-subtext">support@slowburnmethod.com</span>
            </div>
            <ChevronRight size={16} className="reach-arrow" />
          </a>

          {/* Call Us */}
          <a href="tel:+911234567890" className="reach-card">
            <div className="reach-icon-box call-bg">
              <Phone size={18} fill="currentColor" />
            </div>
            <div className="reach-details">
              <span className="reach-heading">Call Us</span>
              <span className="reach-subtext">+91 12345 67890</span>
            </div>
            <ChevronRight size={16} className="reach-arrow" />
          </a>
        </div>
      </section>

      {/* We Care About You Card */}
      <section className="we-care-card">
        <div className="care-left">
          <div className="care-icon-box">
            <Heart size={20} fill="currentColor" />
          </div>
          <div className="care-text">
            <h3 className="care-title">We Care About You</h3>
            <p className="care-desc">Your success is our priority. We're here to support you every step of the way.</p>
          </div>
        </div>
        
        {/* Chat message bubbles art */}
        <div className="care-bubble-art">
          <svg viewBox="0 0 60 50" className="bubble-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 5H12C8.13 5 5 8.13 5 12v20c0 3.87 3.13 7 7 7h24l10 7V39h2c3.87 0 7-3.13 7-7V12c0-3.87-3.13-7-7-7z" fill="rgba(123, 31, 162, 0.25)" />
            <circle cx="20" cy="22" r="3" fill="#B085F5" />
            <circle cx="30" cy="22" r="3" fill="#B085F5" />
            <circle cx="40" cy="22" r="3" fill="#B085F5" />
          </svg>
        </div>
      </section>

      {/* Chat Assistant Modal */}
      {chatOpen && (
        <div className="chat-modal-overlay" onClick={() => setChatOpen(false)}>
          <div className="chat-modal-content" onClick={(e) => e.stopPropagation()}>
            <header className="chat-modal-header">
              <div className="chat-header-profile">
                <div className="bot-avatar">
                  <MessageSquare size={16} fill="white" />
                </div>
                <div>
                  <h3 className="chat-bot-name">SBM Assistant</h3>
                  <span className="bot-status-indicator">Online</span>
                </div>
              </div>
              <button className="chat-close-btn" onClick={() => setChatOpen(false)}>
                <X size={20} />
              </button>
            </header>

            {/* Scrolling messages viewport */}
            <div className="chat-messages-log">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-bubble-row ${msg.isBot ? 'bot-row' : 'user-row'}`}>
                  <div className="chat-bubble">
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble-row bot-row">
                  <div className="chat-bubble typing-bubble">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Send Input Form */}
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input
                type="text"
                placeholder="Ask SBM Assistant..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="chat-input-field"
              />
              <button type="submit" className="chat-send-btn">
                <Send size={18} fill="white" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FAQ Accordion Modal */}
      {faqOpen && (
        <div className="faq-modal-overlay" onClick={() => setFaqOpen(false)}>
          <div className="faq-modal-content" onClick={(e) => e.stopPropagation()}>
            <header className="faq-modal-header">
              <h3 className="faq-modal-title">Frequently Asked Questions</h3>
              <button className="faq-close-btn" onClick={() => setFaqOpen(false)}>
                <X size={20} />
              </button>
            </header>

            {/* Accordion List */}
            <div className="faq-accordion-list">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                    <button className="faq-question-row" onClick={() => toggleFaq(idx)}>
                      <span>{faq.q}</span>
                      <ChevronRight size={18} className="faq-arrow-icon" />
                    </button>
                    <div className="faq-answer-row">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
