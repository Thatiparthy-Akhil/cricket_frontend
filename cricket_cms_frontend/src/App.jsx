import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Articles from "./pages/Articles";
import Players from "./pages/Players";
import LiveScores from "./pages/LiveScores";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Add Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Wrap these pages with ProtectedRoute */}
        <Route
          path="/articles"
          element={
            <ProtectedRoute>
              <Articles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/players"
          element={
            <ProtectedRoute>
              <Players />
            </ProtectedRoute>
          }
        />
        <Route
          path="/live-scores"
          element={
            <ProtectedRoute>
              <LiveScores />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
