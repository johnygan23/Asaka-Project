import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Protected Route Wrapper Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ?
                <Navigate to="/home" replace /> :
                <Login onLogin={handleLogin} />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Inbox</h1>
                    <p className="text-gray-600">This page is coming soon!</p>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Teams</h1>
                    <p className="text-gray-600">This page is coming soon!</p>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
