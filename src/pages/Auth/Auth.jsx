import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Mail, Lock, User, Scale, Sparkles, ChevronDown } from 'lucide-react';
import "../../Styles/pages/Auth.css";

const Auth = () => {
  const { loginUser } = useUser();
  const [isLogin, setIsLogin] = useState(true);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('77.8');
  const [goal, setGoal] = useState('Fat Loss');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Simulate simple login validation
      if (email.trim() !== '' && password.trim() !== '') {
        loginUser('Harish', '77.8');
      } else {
        alert("Please fill in your Email and Password.");
      }
    } else {
      // Signup submission
      if (name.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
        loginUser(name, weight);
      } else {
        alert("Please fill in your Name, Email, and Password.");
      }
    }
  };

  return (
    <div className="auth-page-container fade-in">
      {/* Background glowing decorations */}
      <div className="auth-bg-glow glow-purple"></div>
      <div className="auth-bg-glow glow-blue"></div>

      <div className="auth-card">
        {/* Brand Logo Header */}
        <div className="auth-brand-header">
          <div className="brand-logo-ring">
            <Sparkles size={24} color="white" />
          </div>
          <span className="brand-title">SLOW BURN METHOD</span>
          <p className="brand-tagline">Transform your body. Train your mind.</p>
        </div>

        {/* Section Header */}
        <h1 className="auth-section-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="auth-section-desc">
          {isLogin 
            ? 'Sign in to access your custom tracking dashboard.' 
            : 'Enter your details to generate your SBM health scores.'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form-stack">
          {/* First Name (Only on Signup) */}
          {!isLogin && (
            <div className="input-group">
              <label className="input-label">First Name</label>
              <div className="input-field-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  required
                  placeholder="Harish"
                  className="auth-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-field-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-field-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Weight and Goal Fields (Only on Signup) */}
          {!isLogin && (
            <div className="signup-grid-fields">
              {/* Current Weight */}
              <div className="input-group">
                <label className="input-label">Current Weight</label>
                <div className="input-field-wrapper">
                  <Scale size={18} className="input-icon" />
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="77.8"
                    className="auth-input weight-input-field"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <span className="weight-unit-label">kg</span>
                </div>
              </div>

              {/* Goal Selector */}
              <div className="input-group">
                <label className="input-label">Weight Goal</label>
                <div className="input-field-wrapper select-wrapper">
                  <input
                    type="text"
                    readOnly
                    className="auth-input select-input"
                    value={goal}
                  />
                  <ChevronDown size={16} className="select-arrow" />
                  <select 
                    className="native-select"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    <option value="Fat Loss">Fat Loss</option>
                    <option value="Strength">Strength</option>
                    <option value="Habits">Habit Build</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Submit button */}
          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle Option Link */}
        <div className="auth-toggle-link-row">
          <span>{isLogin ? "Don't have an account? " : "Already have an account? "}</span>
          <button 
            className="auth-toggle-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
