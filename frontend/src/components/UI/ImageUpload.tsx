import React, { useState, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { DocumentArrowUpIcon, XCircleIcon, TrashIcon,PhotoIcon } from '@heroicons/react/24/solid';
import api from '../../services/api';

interface UploadedFile extends File {
  preview?: string; 
}

const ImageUpload: React.FC = () => {

    const [file, setFile] = useState<UploadedFile | null>(null);
    const [rejection, setRejection] = useState<FileRejection | null>(null);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[], rejections: FileRejection[]) => {
    const newFilesWithPreview = accepted.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
        setFile(null);
        setPreviewUrl(null); // Limpa a pré-visualização antiga
        setRejection(null);
        if (accepted.length > 0) {
            const firstFile = accepted[0];
            const newFile = Object.assign(firstFile, {
              preview: URL.createObjectURL(firstFile)
            });
            setFile(newFile);
            setPreviewUrl(newFile.preview); // 3. Define o estado da pré-visualização
          }
      
          if (rejections.length > 0) {
            setRejection(rejections[0]);
          }
        }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
        'image/jpeg': ['.jpeg', '.jpg'],
        'image/png': ['.png'],
        'image/webp': ['.webp'],
      },
      maxFiles: 1, 
      multiple: false,
  });

  const handleExclusion = () => {
    // Limpa todos os estados
    setFile(null);
    setPreviewUrl(null);
    setRejection(null);
  };




  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
                    ${isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}`}
        >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
        </div>
        {previewUrl ? (
          <div>
            <img 
              src={previewUrl} 
              alt="Pré-visualização do upload" 
              className="w-full h-auto max-h-[400px] object-contain rounded-xl"
              onLoad={() => { URL.revokeObjectURL(previewUrl) }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <PhotoIcon className={`w-16 h-16 ${isDragActive ? 'text-indigo-600' : 'text-gray-400'}`} />
            {
              isDragActive ?
                <p className="mt-4 text-xl font-semibold text-indigo-700">Largue a imagem aqui...</p> :
                <p className="mt-4 text-xl font-semibold text-gray-700">Arraste e largue a sua imagem aqui</p>
            }
            <p className="text-sm text-gray-500">ou clique para selecionar (JPG, PNG, WEBP)</p>
          </div>
        )}
                  {rejection && (
            <div className="mt-4">
              <h5 className="font-medium text-red-800">Ficheiro Rejeitado:</h5>
              <li className="text-sm text-red-700 list-disc ml-4">
                {rejection.file.path} - {rejection.errors.map(e => e.message).join(', ')}
              </li>
            </div>
          )}
      </div>
            </div>
  );
};

export default ImageUpload;
