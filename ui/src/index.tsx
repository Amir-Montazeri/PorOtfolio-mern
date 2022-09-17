import './tailwind.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Routers from './routers';
import store from 'store';

const root = ReactDOM.createRoot(document.querySelector('#root') as Element);

root.render(
  <Provider store={store}>
    <Routers />
  </Provider>
);
