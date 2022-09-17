import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getItem } from 'clientBrowser/localStorage';
import { AuthGuard } from 'features';
import { useAppDispatch, useAppSelector } from 'store';
import { loginUserWithAccessToken } from 'store/user/action';
import { logOut } from 'store/user/userSlice';
import { Lazy } from './features';
import Loading from 'features/loading';
import { setGlobalLoading } from 'store/global-loading/globalLoadingSlice';

const Auth = React.lazy(() => import('./pages/auth'));

const addLazy = (children: JSX.Element) => <Lazy>{children}</Lazy>;
const addAuthGuardLazy = (
  children: JSX.Element,
  renderIf: 'registered' | 'not-registered'
) => (
  <AuthGuard renderIf={renderIf}>
    <Lazy>{children}</Lazy>
  </AuthGuard>
);

const Routers: FC = () => {
  const dispatch = useAppDispatch(),
    { user, globalLoading } = useAppSelector((state) => state);

  React.useEffect(() => {
    const accessToken = getItem('access');

    if (accessToken) {
      dispatch(loginUserWithAccessToken(accessToken));
    }
  }, []);

  return (
    <Router>
      <Loading loading={globalLoading.loading} status={globalLoading.status} />
      <Routes>
        <Route
          path="/auth/:authType"
          element={addAuthGuardLazy(<Auth />, 'not-registered')}
        />
        <Route
          path="*"
          element={
            <div>
              Not Found <Link to="/auth/login">Auth</Link>
              {user.user && <h3 onClick={() => dispatch(logOut())}>logout</h3>}
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default Routers;
