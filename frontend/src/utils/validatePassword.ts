export const validatePassword = (value: string): string => {
    if (value.length < 8) return "A senha deve ter no mínimo 8 caracteres.";
    if (!/[a-z]/.test(value)) return "A senha deve conter pelo menos uma letra minúscula.";
    if (!/[A-Z]/.test(value)) return "A senha deve conter pelo menos uma letra maiúscula.";
    if (!/[0-9]/.test(value)) return "A senha deve conter pelo menos um número.";
    return ""; // Sem erro
  };