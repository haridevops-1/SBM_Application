import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Efforts from '../pages/Efforts/Efforts';
import Results from '../pages/Results/Results';
import Resources from '../pages/Resources/Resources';
import Support from '../pages/Support/Support';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/efforts" element={<Efforts />} />
      <Route path="/results" element={<Results />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  );
};

export default AppRouter;
