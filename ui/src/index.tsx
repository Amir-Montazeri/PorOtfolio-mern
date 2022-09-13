import './tailwind.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Routers from './routers';

const root = ReactDOM.createRoot(document.querySelector('#root') as Element);

root.render(<Routers />);
