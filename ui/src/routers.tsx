import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Lazy } from './features';

const Auth = React.lazy(() => import('./pages/auth'));

const addLazy = (children: JSX.Element) => <Lazy>{children}</Lazy>;

const Routers: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/:authType" element={addLazy(<Auth />)} />
        <Route
          path="*"
          element={
            <div>
              Not Found <Link to="/auth/login">Auth</Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default Routers;
