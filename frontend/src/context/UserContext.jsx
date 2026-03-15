import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

// Decode a JWT payload without a library
function parseJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, email, role }

  // Restore user from localStorage on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = parseJwt(token);
      if (payload && payload.exp * 1000 > Date.now()) {
        setUser({ name: payload.name, email: payload.sub, role: payload.role || 'user' });
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    const payload = parseJwt(token);
    if (payload) {
      setUser({ name: payload.name, email: payload.sub, role: role || payload.role || 'user' });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
