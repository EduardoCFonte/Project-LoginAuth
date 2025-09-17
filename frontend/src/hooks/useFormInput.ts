import { useState } from 'react';

export const useFormInput = (validator: (value: string) => string) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError(validator(newValue));
  };

  return { value, error, onChange: handleChange };
};