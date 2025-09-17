import {cpf} from 'cpf-cnpj-validator'

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