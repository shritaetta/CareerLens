import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfileSetup from './pages/ProfileSetup';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import ResumeBuilder from './pages/ResumeBuilder';
import ATSEvaluation from './pages/ATSEvaluation';
import LikedRecommendations from './pages/LikedRecommendations';
import ResumeDrafts from './pages/ResumeDrafts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/ats-evaluation" element={<ATSEvaluation />} />
        <Route path="/liked-recommendations" element={<LikedRecommendations />} />
        <Route path="/resume-drafts" element={<ResumeDrafts />} />
      </Routes>
    </Router>
  );
}

export default App;
