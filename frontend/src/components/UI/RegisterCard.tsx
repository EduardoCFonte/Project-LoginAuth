import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import api from "../../services/api"
import { validatePassword , validateEmail, validateCPF, formatCPF} from '../../utils/validators';
import { useCep } from '../../hooks/useCEP';

const logoImobiliare = 'https://placehold.co/300x80/ffffff/333333?text=IMOBILIARE';

const RegisterCard: React.FC = () => {
    const navigate = useNavigate(); 
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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

    const [formErrors, setFormErrors] = useState({
        password: '',
        confirmPassword: '',
        cpf: '',
        cep: '',
        email: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));

        if (id === 'password') {
            const error = validatePassword(value);
            setFormErrors(prevErrors => ({
                ...prevErrors,
                password: error,
            }));
        }
        else if(id === "cpf"){
            const error = validateCPF(value);
            setFormErrors(prevErrors => ({
                ...prevErrors,
                cpf: error,
            }));
            var cpf_formatted = formatCPF(value);
            setFormData(prevState => ({
                ...prevState,
                ["cpf"]: cpf_formatted,
            }));
        }
        else if( id === "email"){
            const error = validateEmail(value)
            setFormErrors(prevErrors => ({
                ...prevErrors,
                email: error,
            }));
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        try {
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


    formErrors.cep = useCep(formData.cep, setFormData);

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
                            <input id="cpf" type="text" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} required 
                            className={`w-full p-3 border rounded-lg shadow-sm ${
                                    formErrors.cpf ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {formErrors.cpf && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.cpf}</p>
                            )}
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
                        {formErrors.email && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                            )}    
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Senha
                            </label>
                            <input
                                type={showPassword ? "text" : "password"} 
                                id="password"
                                name="password" 
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Crie sua senha"
                                className={`w-full p-3 border rounded-lg shadow-sm ${
                                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {formErrors.password && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 "
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
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                            <input id="confirmPassword" type={showPassword ? "text" : "password"}  placeholder="Repita a senha" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 "
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
                </fieldset>


                <fieldset className="space-y-5">
                    <legend className="text-lg font-semibold text-gray-800 border-b border-gray-200 w-full pb-2 mb-4">Endereço</legend>
                    <div>
                        <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                        <input id="cep" type="text" placeholder="00000-000" value={formData.cep} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        {formErrors.cep&& <p className="text-red-500">{formErrors.cep}</p>}            
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