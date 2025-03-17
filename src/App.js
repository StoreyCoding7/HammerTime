import React from "react";
import { BrowserRouter as Router, } from "react-router-dom";
import AppRoutes from "./routes.js";
import Navbar from "./components/Navbar.js";
import {AuthProvider} from "./context/AuthContext";



function App() {
  return (
    <AuthProvider>
     <Router>
      <Navbar/>
      <AppRoutes/>
     </Router>
    </AuthProvider>
  );
}

export default App;
