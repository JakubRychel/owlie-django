import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PageContent from './components/PageContent';
import Navbar from './components/navbar/Navbar';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TestPage from './pages/TestPage';
import Footer from './components/Footer';


function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<PageContent narrow={true}><LoginPage /></PageContent>} />
          <Route path="/register" element={<PageContent narrow={true}><RegisterPage /></PageContent>} />
          <Route path="/test" element={<PageContent><TestPage /></PageContent>} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;