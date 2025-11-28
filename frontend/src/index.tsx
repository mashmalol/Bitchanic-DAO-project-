import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { greenTheme } from './theme';
import './i18n';
import './index.css';

const root = createRoot(document.getElementById('root')!);

const app = React.createElement(
  React.StrictMode,
  null,
  React.createElement(
    Provider,
    { store: store as any },
    React.createElement(
      ThemeProvider,
      { theme: greenTheme },
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(CssBaseline),
        React.createElement(App)
      )
    )
  )
);

root.render(app);
