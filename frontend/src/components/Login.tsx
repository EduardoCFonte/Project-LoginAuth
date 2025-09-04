import React from "react"
import minhaImagemDeFundo from "../assets/FundoLogin.jpeg"
import LoginCard from "./LoginCard";


const Login : React.FC = () => (
    <main
    style={{ backgroundImage: `url(${minhaImagemDeFundo})` }}
    className="h-screen bg-cover bg-center flex items-center justify-center"
    >
        <div >
        <LoginCard/>        
        </div>
    
    </main>
);

export default Login;