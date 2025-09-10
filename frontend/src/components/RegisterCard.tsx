import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import api from "../services/api"

const logoImobiliare = 'https://placehold.co/300x80/ffffff/333333?text=IMOBILIARE';

const RegisterCard: React.FC = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        cpf: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        try {
            // 2. Preparar os dados para enviar (excluir confirmPassword)
            const { confirmPassword, ...dataToSend } = formData;


            const response = await api.post('/api/register', dataToSend);

            alert(response.data.message); // O axios já formata a resposta para JSON
            navigate('/login');

        } catch (error) {
            // O Axios ajuda a tratar erros de forma mais consistente
            console.error('Erro de registo:', error);
            alert('Não foi possível completar o registo. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="bg-white w-full max-w-2xl p-8 md:p-10 rounded-2xl shadow-xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-center mb-8">
                <img src={logoImobiliare} alt="Logo da Imobiliare" className='h-12 md:h-16' />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">Crie a sua conta</h2>
            <p className="text-center text-gray-500 mb-8">É rápido e fácil.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset className="space-y-5">
                    <legend className="text-lg font-semibold text-gray-800 border-b border-gray-200 w-full pb-2 mb-4">Dados Pessoais</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                            <input id="firstName" type="text" placeholder="Seu primeiro nome" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
                            <input id="lastName" type="text" placeholder="Seu sobrenome" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                            <input id="cpf" type="text" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                            <input id="phone" type="tel" placeholder="(00) 90000-0000" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>
                </fieldset>

                <fieldset className="space-y-5">
                    <legend className="text-lg font-semibold text-gray-800 border-b border-gray-200 w-full pb-2 mb-4">Dados de Acesso</legend>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input id="email" type="email" placeholder="seu.email@exemplo.com" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                            <input id="password" type="password" placeholder="Crie uma senha forte" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                            <input id="confirmPassword" type="password" placeholder="Repita a senha" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>
                </fieldset>


                <fieldset className="space-y-5">
                    <legend className="text-lg font-semibold text-gray-800 border-b border-gray-200 w-full pb-2 mb-4">Endereço</legend>
                    <div>
                        <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                        <input id="cep" type="text" placeholder="00000-000" value={formData.cep} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
                            <input id="street" type="text" placeholder="Nome da sua rua" value={formData.street} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                           <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                            <input id="number" type="text" placeholder="Nº" value={formData.number} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">Complemento <span className="text-gray-400">(Opcional)</span></label>
                        <input id="complement" type="text" placeholder="Apto, bloco, casa, etc." value={formData.complement} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                     <div>
                        <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                        <input id="neighborhood" type="text" placeholder="Seu bairro" value={formData.neighborhood} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                            <input id="city" type="text" placeholder="Sua cidade" value={formData.city} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                           <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                            <input id="state" type="text" placeholder="UF" value={formData.state} onChange={handleChange} required maxLength={2} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>
                </fieldset>
                
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 !mt-8">
                    Criar Conta
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-8">
                Já tem uma conta?{' '}
                <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Faça login
                </Link>
            </p>
        </div>
    );
};

export default RegisterCard;