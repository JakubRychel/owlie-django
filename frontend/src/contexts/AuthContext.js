import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login, refresh } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem('access') ? jwtDecode(localStorage.getItem('access')) : null
  );

  const loginUser = async (username, password) => {
    const data = await login(username, password);
    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);
    setUser(jwtDecode(data.access));
  };

  const logoutUser = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  }

  const refreshToken = async () => {
    const token = localStorage.getItem('refresh');

    if (!token) {
      logoutUser();
      return;
    }

    try {
      const data = await(refresh(token));
      localStorage.setItem('access', data.access);
      setUser(jwtDecode(data.access));
    }
    catch(error) {
      logoutUser();
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 1000 * 60 * 4);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login: loginUser, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);