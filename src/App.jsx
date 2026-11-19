import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ParticipantProvider } from './context/ParticipantContext';
import { AdminProvider } from './context/AdminContext';
import { ParticipantDashboard } from './pages/ParticipantDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { SvgSprite } from './components/common/Icon';

export default function App() {
  return (
    <Router>
      <ParticipantProvider>
        <AdminProvider>
          {/* Global SVG Sprite for high-performance <symbol> + <use> rendering */}
          <SvgSprite />
          <Routes>
            <Route path="/" element={<ParticipantDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<ParticipantDashboard />} />
          </Routes>
        </AdminProvider>
      </ParticipantProvider>
    </Router>
  );
}
