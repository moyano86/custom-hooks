import { useState } from "react";

export const useForm = (initialForm = {}) => {
  
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({target}) => {
    const {name, value} = target;

    setFormState({
      ...formState,
      [name]: value
    });

  }

  const onResetForm = () => {
    setFormState(initialForm);
  }
  
  //En el return devolvemos tanto el formState entero como su desestructuración, es decir, los elementos que lo componen por separado
  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm
  }
}
