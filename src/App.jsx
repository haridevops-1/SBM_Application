import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import BottomNav from './components/BottomNav/BottomNav';
import Auth from './pages/Auth/Auth';
import ProfileDrawer from './components/ProfileDrawer/ProfileDrawer';
import { useUser } from './context/UserContext';
import "./Styles/App.css";

function App() {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Auth />;
  }

  return (
    <BrowserRouter>
      <div className="app-content">
        <AppRouter />
      </div>
      <BottomNav />
      <ProfileDrawer />
    </BrowserRouter>
  );
}

export default App;
