import React from 'react';
import RegisterCard from "../components/UI/RegisterCard";
import BackgroundImageLogin from "../assets/FundoLogin.jpeg"


const RegisterPage: React.FC = () => {
  return (
    <main
      style={{ backgroundImage: `url(${BackgroundImageLogin})` }}
      className="h-screen bg-cover bg-center flex items-center justify-center"
    >
      <RegisterCard />
    </main>
  );
};

export default RegisterPage