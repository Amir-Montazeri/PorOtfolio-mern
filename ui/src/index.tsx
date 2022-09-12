import './globalStyles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const root = ReactDOM.createRoot(document.querySelector('#root') as Element);

root.render(<App />);
