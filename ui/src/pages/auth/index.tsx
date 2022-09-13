import React, { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthLayout } from '../../layouts';
import { LoginComponent, RegisterComponent } from '../../components';

const Auth: FC = () => {
  const { authType } = useParams();

  return authType === 'login' || authType === 'register' ? (
    <AuthLayout type={authType}>
      <LoginComponent isActive={authType === 'login'} />
      <RegisterComponent isActive={authType === 'register'} />
    </AuthLayout>
  ) : (
    <Navigate to="/auth/register" />
  );
};

export default Auth;
