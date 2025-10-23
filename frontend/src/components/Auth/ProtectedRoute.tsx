import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute: React.FC = () => {
    const { token, user} = useAuth(); // Pergunta ao AuthContext: "Temos um token/utilizador?"

    // Opcional: Adicionar um estado de carregamento para uma melhor UX
    // const { isLoading } = useAuth();
    // if (isLoading) {
    //   return <div>A carregar...</div>; // Mostra um spinner enquanto verifica o token inicial
    // }

    // A lógica do segurança:
    if (!token) {
        // Se NÃO houver token, redireciona para a página de login.
        // O 'replace' evita que o utilizador possa usar o botão "Voltar" do navegador para
        // voltar para a página protegida.
        return <Navigate to="/login" replace />;
    }

    // Se houver um token, renderiza o componente da rota que está a ser protegido.
    // O <Outlet /> é um placeholder que o react-router substitui pela página correta
    // (ex: <DashboardPage />).
    return <Outlet />;
};

export default ProtectedRoute;