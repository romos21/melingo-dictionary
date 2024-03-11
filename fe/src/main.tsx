import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import CustomThemeProvider from './theme/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>,
);
