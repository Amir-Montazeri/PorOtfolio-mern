import React, { FC } from 'react';
import axios from 'axios';
import AuthForm from '../auth-form';

interface LoginComponentPropTypes {
  isActive: boolean;
}

const loginFields: {
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

interface AuthDataType {
  email: string;
  password: string;
}

const LoginComponent: FC<LoginComponentPropTypes> = ({ isActive }) => {
  const handleSubmitForm = (data: AuthDataType) => {
    const { email, password } = data;

    axios
      .get(
        `http://localhost:5000/auth/login?email=${email}&password=${password}`
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
      fields={loginFields}
      submitText="login"
      isActive={isActive}
      onSubmit={handleSubmitForm}
      side="left"
    />
  );
};

export default LoginComponent;
