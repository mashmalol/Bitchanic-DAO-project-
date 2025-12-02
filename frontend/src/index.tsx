import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { getGreenTheme, applyRetroOverrides } from './theme';
import { createTheme } from '@mui/material/styles';
import './i18n';
import './index.css';

const root = createRoot(document.getElementById('root')!);

function RootApp() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const theme = React.useMemo(() => {
    const base = getGreenTheme(mode);
    const overrides = applyRetroOverrides(base);
    return createTheme(base, overrides as any);
  }, [mode]);

  const toggleTheme = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'));

  const appTree = React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      Provider,
      { store: store as any },
      React.createElement(
        ThemeProvider,
        { theme },
        React.createElement(
          BrowserRouter,
          null,
          React.createElement(CssBaseline),
          React.createElement(App, { themeMode: mode, toggleTheme })
        )
      )
    )
  );

  return appTree;
}

root.render(React.createElement(RootApp));
