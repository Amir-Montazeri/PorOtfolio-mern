import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface AuthButtonPropTypes {
  active: Boolean;
  title: string;
  navigateTo: string;
}

const AuthButton: FC<AuthButtonPropTypes> = ({ active, title, navigateTo }) => {
  return (
    <Link to={navigateTo}>
      <h3
        className={`pb-[5px] border-b-[3px] transition-all duration-[.3s] ${
          active ? 'text-white border-white' : 'text-[#999] border-[#fff0]'
        } uppercase cursor-pointer`}
      >
        {title}
      </h3>
    </Link>
  );
};

export default AuthButton;
