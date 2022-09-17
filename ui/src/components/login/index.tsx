import React, { FC } from 'react';
import AuthForm from '../auth-form';
import { useAppDispatch, useAppSelector } from 'store';
import { loginUserWithEmailAndPassword } from 'store/user/action';

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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => {
    return state.user;
  });

  const handleSubmitForm = (data: AuthDataType) => {
    dispatch(loginUserWithEmailAndPassword(data));
  };

  return (
    <AuthForm
      fields={loginFields}
      submitText="login"
      isActive={isActive}
      error={user.error.login}
      isLoading={user.isLoading}
      onSubmit={handleSubmitForm}
      side="left"
    />
  );
};

export default LoginComponent;
