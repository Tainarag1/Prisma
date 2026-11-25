import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";

import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import DiaryScreen from "./components/DiaryScreen";
import CalendarScreen from "./components/CalendarScreen";
import AnalyticsScreen from "./components/AnalyticsScreen";
import ProfileScreen from "./components/ProfileScreen";

function AppRoutes() {
  const { isLoggedIn } = useApp();

  console.log("LOGIN STATUS:", isLoggedIn);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn
            ? <Navigate to="/home" replace />
            : <LoginScreen />
        }
      />

      <Route
        path="/home"
        element={
          isLoggedIn
            ? <HomeScreen />
            : <Navigate to="/" replace />
        }
      />

      <Route
        path="/diary"
        element={
          isLoggedIn
            ? <DiaryScreen />
            : <Navigate to="/" replace />
        }
      />

      <Route
        path="/calendar"
        element={
          isLoggedIn
            ? <CalendarScreen />
            : <Navigate to="/" replace />
        }
      />

      <Route
        path="/analytics"
        element={
          isLoggedIn
            ? <AnalyticsScreen />
            : <Navigate to="/" replace />
        }
      />

      <Route
        path="/profile"
        element={
          isLoggedIn
            ? <ProfileScreen />
            : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}