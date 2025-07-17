import React from "react"
import minhaImagemDeFundo from "../assets/FundoLogin.jpeg"


const Login : React.FC = () => (
    <main
    style={{ backgroundImage: `url(${minhaImagemDeFundo})` }}
    className="h-screen bg-cover bg-center flex items-center justify-center"
    >
        <div className = "bg-yellow-400 rounded-lg shadow-lg w-1/3 h-3/4">
        

        </div>
    
    </main>
);

export default Login;