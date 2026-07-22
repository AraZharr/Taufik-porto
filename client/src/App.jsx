import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import EditHero from './pages/admin/EditHero';
import EditAbout from './pages/admin/EditAbout';
import EditContact from './pages/admin/EditContact';
import ProtectedRoute from './components/common/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/edit-hero" element={
            <ProtectedRoute>
              <EditHero />
            </ProtectedRoute>
          } />
          <Route path="/admin/edit-about" element={
            <ProtectedRoute>
              <EditAbout />
            </ProtectedRoute>
          } />
          <Route path="/admin/edit-contact" element={
            <ProtectedRoute>
              <EditContact />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
