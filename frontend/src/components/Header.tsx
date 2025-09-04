import React from 'react';
// Usaremos um ícone mais apropriado para uma imobiliária
import { HomeModernIcon } from '@heroicons/react/24/solid';

// Um placeholder de logo mais adequado para um fundo claro
const logoImobiliare = 'https://placehold.co/300x80/334155/ffffff?text=IMOBILIARE&font=raleway';

const Header: React.FC = () => (
  // Header principal: fundo branco, sombra, e fica fixo no topo da página
  <header className="w-full bg-white shadow-md sticky top-0 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">

        {/* Lado Esquerdo: Ícone da Marca */}
        <div className="flex-1 flex justify-start">
          <a href="/" className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-300">
            <HomeModernIcon className="h-8 w-8" />
          </a>
        </div>

        {/* Centro: Logo Principal */}
        <div className="flex-1 flex justify-center">
          <a href="/">
            <img src={logoImobiliare} alt="Logo da Imobiliare" className="h-10" />
          </a>
        </div>

        {/* Lado Direito: Perfil do Utilizador */}
        <div className="flex-1 flex justify-end items-center space-x-3">
          <span className="hidden sm:inline font-medium text-slate-700">
            Olá, Eduardo
          </span>
          <button className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-colors duration-300">
            {/* Usando um avatar placeholder como exemplo */}
            <img src="https://i.pravatar.cc/48?u=eduardo" alt="Avatar do usuário" />
          </button>
        </div>

      </div>
    </div>
  </header>
);

export default Header;



  
  
