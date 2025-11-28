import { createTheme } from '@mui/material/styles';

export const greenTheme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Forest green
      light: '#66bb6a',
      dark: '#1b5e20',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4caf50', // Standard green
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#fff',
    },
    success: {
      main: '#2e7d32',
    },
    background: {
      default: '#f1f8f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#1b5e20',
    },
    h6: {
      fontWeight: 500,
      color: '#2e7d32',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
          boxShadow: '0 4px 12px rgba(30, 125, 50, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          border: '1px solid rgba(46, 125, 50, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(46, 125, 50, 0.15)',
            borderColor: 'rgba(46, 125, 50, 0.3)',
          },
        },
      },
    },
  },
});
