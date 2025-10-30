import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { DocumentArrowUpIcon, XCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import api from '../../services/api';

interface UploadedFile extends File {
  preview?: string; 
}

const FileUpload: React.FC = () => {

  const [acceptedFiles, setAcceptedFiles] = useState<UploadedFile[]>([]);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);

  const onDrop = useCallback((accepted: File[], rejections: FileRejection[]) => {
    const newFilesWithPreview = accepted.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
  
      setAcceptedFiles(prevFiles => [
        ...prevFiles,       
        ...newFilesWithPreview 
      ]);
      setFileRejections(prevRejections => [
        ...prevRejections,      
        ...rejections 
      ]);
    }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 5, 
  });

  const handleUpload = async () => {
    if (acceptedFiles.length === 0) {
      alert("Por favor, selecione pelo menos um ficheiro para enviar.");
      return;
    }

    const formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('files', file); 
    });
    console.log(acceptedFiles)
    try {
      const response = await api.post("/api/v1/upload-documents", formData)

      console.log("Enviando ficheiros:", acceptedFiles);
      alert("Ficheiros enviados com sucesso! (Simulação)");
      setAcceptedFiles([]);
      setFileRejections([]);

    } catch (error) {
      console.error("Erro ao enviar os ficheiros:", error);
      alert("Erro ao enviar os ficheiros.");
    }
  };
  const handleExclusion = (fileToRemove:File) => {
    setAcceptedFiles(prevFiles => 
        prevFiles.filter(file => file.name !== fileToRemove.name)
      );
}

  const acceptedFilesItems = acceptedFiles.map(file => {
    console.log(file);
    return (
        <li key={file.name} className="text-sm text-green-700 list-disc ml-4">
      <span className='flex-1 truncate' title={file.name}> 
        {file.name} - {(file.size / 1024).toFixed(2)} KB
      </span>
      
      <button 
        type="button" 
        onClick={() => handleExclusion(file)} 
        className="ml-4 p-1 rounded-full text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors justify-content:flex-end"
        aria-label={`Remover ${file.name}`} 
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
    );
});



  const rejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path} className="text-sm text-red-700 list-disc ml-4">
      {file.path} - {errors.map(e => e.message).join(', ')}
    </li>
  ));

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
                    ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <DocumentArrowUpIcon className={`w-16 h-16 ${isDragActive ? 'text-indigo-600' : 'text-gray-400'}`} />
          {
            isDragActive ?
              <p className="mt-4 text-xl font-semibold text-indigo-700">Largue os ficheiros aqui...</p> :
              <p className="mt-4 text-xl font-semibold text-gray-700">Arraste e largue os seus PDFs aqui</p>
          }
          <p className="text-sm text-gray-500">ou clique para selecionar os ficheiros (Máx 5 ficheiros, apenas .pdf)</p>
        </div>
      </div>
      {(acceptedFiles.length > 0 || fileRejections.length > 0) && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-semibold mb-4">Ficheiros Selecionados:</h4>
          {acceptedFiles.length > 0 && (
            <div>
              <h5 className="font-medium text-green-800">Aceites:</h5>
              <ul>{acceptedFilesItems}</ul>
            </div>
          )}
          {fileRejections.length > 0 && (
            <div className="mt-4">
              <h5 className="font-medium text-red-800">Rejeitados (tipo inválido ou limite excedido):</h5>
              <ul>{rejectionItems}</ul>
            </div>
          )}
          
          {acceptedFiles.length > 0 && (
            <button
              onClick={handleUpload}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out mt-6"
            >
              Processar e Enviar Ficheiros
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
