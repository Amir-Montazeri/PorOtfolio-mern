import React, { FC } from 'react';

interface AuthComponentPropTypes {
  type: 'login' | 'register';
}

const AuthComponent: FC<AuthComponentPropTypes> = ({ type }) => {
  return <div>AuthComponent</div>;
};

export default AuthComponent;
