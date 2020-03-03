import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    callback(); //makes this hook more reusable, instead of adduser, logging in... we just call it
  };
  return {
    onChange,
    onSubmit,
    values,
  };
};
