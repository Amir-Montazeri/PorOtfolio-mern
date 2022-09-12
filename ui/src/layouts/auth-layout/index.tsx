import React, { FC } from 'react';

interface AuthLayoutPropTypes {
  children: JSX.Element;
}

const AuthLayout: FC<AuthLayoutPropTypes> = ({ children }) => {
  return <div style={{ background: 'red' }}>{children}</div>;
};

export default AuthLayout;
