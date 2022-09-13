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
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
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
