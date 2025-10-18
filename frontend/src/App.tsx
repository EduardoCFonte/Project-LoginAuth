import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; 

import Header from './components/Layout/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (

      <AuthProvider>
        <div className="flex flex-col h-screen bg-gray-100">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

            </Routes>
          </main>
        </div>
      </AuthProvider>
  );
};

export default App;