
import { useEffect, useState } from 'react';

export const useCep = (cepValue: string, setFormData: Function): string => {

    const [cepError, setCepError] = useState('');

    useEffect(() => {

        const cepNumerico = cepValue.replace(/\D/g, ''); 

        const fetchAddress = async () => {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
                const data = await response.json();

                if (data.erro) {
                    setFormData((prevData: any) => ({
                        ...prevData, street: '', neighborhood: '', city: '', state: '',
                    }));
                    setCepError("CEP não encontrado.");
                    return;
                }

                setFormData((prevData: any) => ({
                    ...prevData,
                    street: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf,
                }));
                setCepError(""); 

            } catch (error) {
                setCepError("Erro ao consultar o CEP. Verifique sua conexão.");
            }
        };

        if (cepNumerico.length === 8) {
            fetchAddress();
        } else if (cepNumerico.length > 0) {
            setCepError("CEP deve conter 8 dígitos.");
        } else {
            setCepError(""); 
        }

    }, [cepValue, setFormData]); 

    return cepError;
};
