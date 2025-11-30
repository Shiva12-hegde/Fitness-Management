import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Meals } from './pages/Meals';
import { Workouts } from './pages/Workouts';
import { Progress } from './pages/Progress';
import { Diet } from './pages/Diet';
import { Forum } from './pages/Forum';
import { Profile } from './pages/Profile';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="meals" element={<Meals />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="progress" element={<Progress />} />
        <Route path="diet-plan" element={<Diet />} />
        <Route path="forum" element={<Forum />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
}