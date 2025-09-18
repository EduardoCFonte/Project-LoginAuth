
import {cpf} from 'cpf-cnpj-validator'

export const validatePassword = (value: string): string => {
    if (value.length < 8) return "A senha deve ter no mínimo 8 caracteres.";
    if (!/[a-z]/.test(value)) return "A senha deve conter pelo menos uma letra minúscula.";
    if (!/[A-Z]/.test(value)) return "A senha deve conter pelo menos uma letra maiúscula.";
    if (!/[0-9]/.test(value)) return "A senha deve conter pelo menos um número.";
    return ""; 
  };

  export const validateEmail = (email: string): string => {
    if (!email) {
      return "O e-mail é obrigatório.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "O formato do e-mail é inválido.";
    }
    return ""; 
  };

export const validateCPF = (value: string) :string => {

    if(!value)
        return "CPF é obrigatório."
    if(!cpf.isValid(value)) 
        return "CPF Inválido"

    return "";

}

export const formatCPF = (value:string) :string => {
    return cpf.format(value)
}

export const validateCEPFormat = (cep: string): string => {
  if (!cep) {
    return "O CEP é obrigatório.";
  }
  
  // Remove caracteres não numéricos para a validação
  const cepNumerico = cep.replace(/\D/g, '');

  // A RegEx /^(\d{8})$/ verifica se a string contém exatamente 8 dígitos.
  if (!/^\d{8}$/.test(cepNumerico)) {
    return "O formato do CEP é inválido. Deve conter 8 dígitos.";
  }

  return ""; // Formato válido
};

