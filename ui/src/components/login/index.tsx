import React, { FC } from 'react';
import AuthForm from '../auth-form';

interface LoginComponentPropTypes {
  isActive: boolean;
}

const loginFields = [
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

const LoginComponent: FC<LoginComponentPropTypes> = ({ isActive }) => {
  return (
    <AuthForm
      fields={loginFields}
      submitText="register"
      isActive={isActive}
      side="left"
    />
  );
};

export default LoginComponent;
