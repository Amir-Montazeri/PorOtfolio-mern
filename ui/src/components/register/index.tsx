import React, { FC } from 'react';
import axios from 'axios';

import AuthForm from '../auth-form';

interface LoginComponentPropTypes {
  isActive: boolean;
}

interface AuthDataType {
  email: string;
  password: string;
}

const registerFields: {
  label: string;
  type: string;
  name: 'email' | 'password';
  required: boolean | string;
}[] = [
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    required: 'email field is required',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    required: 'password field is required',
  },
];

const RegisterComponent: FC<LoginComponentPropTypes> = ({ isActive }) => {
  const handleSubmitForm = (data: AuthDataType) => {
    const { email, password } = data;

    axios
      .post(
        `http://localhost:5000/auth/register?email=${email}&password=${password}`
      )
      .then((res) => {
        console.log('suc! ', res);
      })
      .catch((err) => {
        console.log('err! ', err);
      });
  };

  return (
    <AuthForm
      fields={registerFields}
      submitText="register"
      isActive={isActive}
      onSubmit={handleSubmitForm}
      side="right"
    />
  );
};

export default RegisterComponent;
