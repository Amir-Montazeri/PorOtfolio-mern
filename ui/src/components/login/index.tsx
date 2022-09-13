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
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
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
