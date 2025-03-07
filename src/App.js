//
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// Import Files
import AppRoutes from "./routes.js"; // Import the routes file
import './App.css';


function App() {
  return (
    <Router>

     <AppRoutes />
     
    </Router>
  );
}

export default App;
