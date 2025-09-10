import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- Ícones (SVG embutido para não precisar de bibliotecas externas) ---

// Ícone do Google
const GoogleIcon: React.FC = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.233,44,30.413,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

// --- Componente Principal ---

// Placeholder para a sua imagem de logo
const logoImobiliare = 'https://placehold.co/300x80/ffffff/333333?text=IMOBILIARE';

const LoginCard: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`A tentar login com: \nEmail: ${email}\nSenha: ${password}`);
    };
    
    const handleGoogleLogin = () => {
        alert('A iniciar login com o Google...');
    }

    return (

            
            <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-2xl shadow-xl">
                
                <div className="flex justify-center mb-8">
                    <img src={logoImobiliare} alt="Logo da Imobiliare" className='h-12 md:h-16' />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Bem-vindo de volta!</h2>
                <p className="text-center text-gray-500 mb-8">Faça login para continuar</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input 
                            id="email"
                            type="email" 
                            placeholder="seu.email@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                        />
                    </div>
                    
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                                Esqueceu a senha?
                            </a>
                        </div>
                        <div className="relative">
                            <input 
                                id="password"
                                type={showPassword ? "text" : "password"} 
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    {showPassword ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.23 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
                                    ) : (
                                        <>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Botão de Entrar */}
                    <button 
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out"
                    >
                        Entrar
                    </button>
                </form>

                {/* Divisor "ou" */}
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-500 text-sm">ou</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Botão de Login com Google */}
                <button 
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300 ease-in-out"
                >
                    <GoogleIcon />
                    Entrar com o Google
                </button>

                <p className="text-center text-sm text-gray-600 mt-8">
                    Não tem uma conta?{' '}
                    <Link to = "/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Cadastre-se
                    </Link>
                </p>

            </div>

    );
};

export default LoginCard;