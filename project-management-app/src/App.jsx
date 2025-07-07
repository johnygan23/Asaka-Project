import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ProjectDetails from './pages/ProjectDetails';
import Inbox from './pages/Inbox';
import Team from './pages/Team';
import './App.css';
import { loginAsync, isTokenValid, refreshTokens } from './API/AuthAPI';
import * as ProjectAPI from './API/ProjectAPI';
import { getAllUsers } from './API/UserAPI';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function runApp () {
      // When the app loads, check if token is valid
      var result = isTokenValid();
      // No 'tokens' key found in localStorage
      if (result === null) return;
      if(!result.isValid) {
        try{
          await refreshTokens(result.userId, result.refreshToken);
          console.log("Successfully refreshed token.");
        } catch (e){
          setIsAuthenticated(false);
          console.log("Error in refreshing tokens.", e);
          return;
        }
      }
      setIsAuthenticated(true);
      // If valid, begin fetching data
      await fetchProjects();
      await fetchUsers();
    }
    runApp();
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      const data = response.data;
      console.log("Retrieved users: ", data);
      setUsers(Array.isArray(data) ? data : (data.users || []));
    } catch (error) {
      
      setUsers([]);
    }
  }

    const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const response = await ProjectAPI.getAllProjects();
      const data = response.data;
      console.log("Retrieved projects: ", data);
      setProjects(Array.isArray(data) ? data : (data.projects || []));
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleLogin = async (formData) => {
    try {
      const response = await loginAsync({ ...formData });
      localStorage.setItem("tokens", JSON.stringify(response.data));
      setIsAuthenticated(true);
      console.log("Successful login:", response.data);

      await fetchProjects();
      await fetchUsers();

    } catch (error) {
      // Do something here like show a login fail message to user
      console.error("Error logging user in: ", error);
      throw error;
    }
  }
  
  const handleSignup = async ({ username, email, password, role }) => {
    try {
      const response = await signupAsync({ username, email, password, role });
      // Redirect user to login page after successful signup
      navigate('/login');
    } catch (error){
      console.error("Error registering user: ", error);
      throw error;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    setIsAuthenticated(false);
  };

  const handleUpdateProject = (projectId, updates) => {
    setProjects(
      projects.map((p) => (p.id === projectId ? { ...p, ...updates } : p))
    );
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
          element={<Signup onSignup={handleSignup} />}
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
              <Projects onLogout={handleLogout} />
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
              <Inbox onLogout={handleLogout} projects={projects} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <ProtectedRoute>
              <Team onLogout={handleLogout} projects={projects} teamMembers={users} />
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
