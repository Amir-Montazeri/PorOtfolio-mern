import React, { FC } from 'react';

import AuthForm from '../auth-form';
import { registerUser } from 'store/user/action';
import { useAppDispatch, useAppSelector } from 'store';

interface LoginComponentPropTypes {
  isActive: boolean;
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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => {
    return state.user;
  });

  const handleSubmitForm = (data: AuthFieldType) => {
    dispatch(registerUser(data));
  };

  return (
    <AuthForm
      fields={registerFields}
      submitText="register"
      isActive={isActive}
      error={user.error.register}
      isLoading={user.isLoading}
      onSubmit={handleSubmitForm}
      side="right"
    />
  );
};

export default RegisterComponent;
