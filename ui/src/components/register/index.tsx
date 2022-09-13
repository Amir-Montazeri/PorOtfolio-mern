import React, { FC } from 'react';
import AuthForm from '../auth-form';

interface LoginComponentPropTypes {
  isActive: boolean;
}

const registerFields = [
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
  return (
    <AuthForm
      fields={registerFields}
      submitText="login"
      isActive={isActive}
      side="right"
    />
  );
};

export default RegisterComponent;
