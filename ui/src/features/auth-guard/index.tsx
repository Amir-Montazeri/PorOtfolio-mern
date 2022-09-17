import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';

interface AuthGuardPropTypes {
  renderIf: 'registered' | 'not-registered';
  children: JSX.Element;
}

function AuthGuard({ renderIf, children }: AuthGuardPropTypes) {
  const user = useAppSelector((state) => {
    return state.user;
  });

  if (user.isLoading) {
    return <h3>Loading..</h3>;
  }
  switch (renderIf) {
    case 'registered':
      if (user.user) {
        return children;
      } else <Navigate to="/auth/login" />;

    case 'not-registered':
      if (!user.user) {
        return children;
      } else return <Navigate to="/" />;

    default:
      return <h3>Loading..</h3>;
  }
}

export default AuthGuard;
