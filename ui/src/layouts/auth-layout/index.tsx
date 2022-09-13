import React, { FC } from 'react';
import AuthButton from './auth-button';

interface AuthLayoutPropTypes {
  type: 'login' | 'register';
  children: JSX.Element[];
}

const AuthLayout: FC<AuthLayoutPropTypes> = ({ type, children }) => {
  return (
    <div className="h-screen w-screen py-[40px] flex items-center flex-col">
      <h1 className="text-white text-3xl capitalize">
        login {'&'} signup there
      </h1>
      <div
        className={`mt-[50px] mb-[30px] transition-all duration-[.2s] flex w-[170px] justify-between ${
          type === 'login' ? 'translate-x-[20%]' : 'translate-x-[-30%]'
        }`}
      >
        <AuthButton
          active={type === 'login'}
          title="login"
          navigateTo="/auth/login"
        />
        <AuthButton
          active={type === 'register'}
          title="register"
          navigateTo="/auth/register"
        />
      </div>
      <div className="flex">{children}</div>
    </div>
  );
};

export default AuthLayout;
