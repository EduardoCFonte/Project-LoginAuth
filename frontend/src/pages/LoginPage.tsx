import React from "react"
import BackgroundImage from "../assets/FundoLogin.jpeg"
import LoginCard from "../components/UI/LoginCard"
import Header from "../components/Layout/Header";


const LoginPage : React.FC = () => (
    <main
    style={{ backgroundImage: `url(${BackgroundImage})` }}
    className="h-screen bg-cover bg-center flex items-center justify-center"
    >
        <div >
            <LoginCard/>        
        </div>
    
    </main>
);

export default LoginPage;