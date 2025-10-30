import React from 'react';
import FileUpload from '../components/UI/FileUpload'; // Importe o novo componente

const MainPage: React.FC = () => {
  return (
    // Um layout simples para centrar o componente de upload
    <div className="w-full min-h-full py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Processador de Documentos
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Envie os seus documentos jurídicos em formato PDF para atualizar a base de conhecimento.
        </p>
      </div>
      <FileUpload />
      
    </div>
  );
};

export default MainPage;
