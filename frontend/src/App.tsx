import React from 'react';
import Header from './components/Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage"

const App = () => {
  return (
<div className="flex flex-col h-screen">
      {/* Header rendered outside routes*/}
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
