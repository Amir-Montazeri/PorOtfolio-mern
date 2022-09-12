import React, { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthLayout } from 'layouts';
import AuthComponent from './auth-component';

const Auth: FC = () => {
  const { authType } = useParams();

  return authType === 'login' || authType === 'register' ? (
    <AuthLayout>
      <AuthComponent type={authType} />
    </AuthLayout>
  ) : (
    <Navigate to="/auth/register" />
  );
};

export default Auth;
