// src/context/AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // current logged-in user
  const [authMessage, setAuthMessage] = useState(""); // for inline success/error messages

  return (
    <AuthContext.Provider
      value={{ user, setUser, authMessage, setAuthMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
