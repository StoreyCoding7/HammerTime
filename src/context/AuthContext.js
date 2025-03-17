import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore token from localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      console.log("User token found in localStorage:", token);
      setUser({ token });
    }
  }, []);

  useEffect(() => {
    // Whenever the user state changes, persist the token in localStorage
    if (user) {
      localStorage.setItem("authToken", user.token);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [user]); // This ensures the token is updated or removed when user state changes


  
  // Login function that sends a request to the backend and stores the token
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login successful:", data);

      // Store token in localStorage
      localStorage.setItem("authToken", data.token);
      setUser({ token: data.token });

    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  // Logout function to clear the token
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    console.log("User logged out, state reset.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
