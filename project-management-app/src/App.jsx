import { Routes, Route, Navigate } from 'react-router-dom';
import { initialProjects } from './data/project';
import { useState } from 'react';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ProjectDetails from './pages/ProjectDetails';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState(initialProjects);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleAddProject = (newproject) => {
    setProjects([...projects, { ...newproject, id: Date.now() }]);
  };

  const handleUpdateProject = (projectId, updates) => {
    setProjects(projects.map(p => (p.id === projectId ? { ...p, ...updates } : p)));
  };

  // Protected Route Wrapper Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
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
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home onLogout={handleLogout} projects={projects} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks onLogout={handleLogout} projects={projects} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects
                onLogout={handleLogout}
                projects={projects}
                onAddProject={handleAddProject}
              />
            </ProtectedRoute>
          }
        />
        {/* Project Details */}
        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute>
              <ProjectDetails onLogout={handleLogout} projects={projects} onUpdateProject={handleUpdateProject} />
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
  );
}

export default App;
