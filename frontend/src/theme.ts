import { createTheme, ThemeOptions } from '@mui/material/styles';

// Helper to create a green theme with light/dark modes
export function getGreenTheme(mode: 'light' | 'dark' = 'dark') {
  const isDark = mode === 'dark';

  const palette: ThemeOptions['palette'] = {
    mode,
    primary: {
      main: isDark ? '#0b3d1e' : '#2e7d32',
      light: isDark ? '#2e7d32' : '#66bb6a',
      dark: isDark ? '#062712' : '#1b5e20',
      contrastText: isDark ? '#e8f5e9' : '#fff',
    },
    secondary: {
      main: isDark ? '#154f2a' : '#4caf50',
      light: isDark ? '#1b5e20' : '#81c784',
      dark: isDark ? '#0a3a1a' : '#388e3c',
      contrastText: isDark ? '#e8f5e9' : '#fff',
    },
    success: {
      main: isDark ? '#0b3d1e' : '#2e7d32',
    } as any,
    background: {
      default: isDark ? '#071b10' : '#f1f8f5',
      paper: isDark ? '#082e18' : '#ffffff',
    },
  };

  const base: ThemeOptions = {
    palette,
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
        color: isDark ? '#e8f5e9' : '#1b5e20',
      },
      h6: {
        fontWeight: 500,
        color: isDark ? '#dff6e8' : '#2e7d32',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: isDark
              ? 'linear-gradient(135deg, #062712 0%, #0b3d1e 60%, #154f2a 100%)'
              : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
            boxShadow: isDark ? '0 6px 18px rgba(5, 40, 20, 0.6)' : '0 4px 12px rgba(30,125,50,0.08)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            background: isDark
              ? 'linear-gradient(135deg, #0b3d1e 0%, #154f2a 100%)'
              : 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
            color: isDark ? '#e8f5e9' : '#fff',
            '&:hover': {
              background: isDark ? 'linear-gradient(135deg, #062712 0%, #0b3d1e 100%)' : undefined,
            },
          },
          text: {
            color: isDark ? '#eaf8ee' : undefined,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            border: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.06)',
            backgroundColor: isDark ? '#0a3018' : '#fff',
            color: isDark ? '#eaf8ee' : undefined,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: isDark ? '0 12px 32px rgba(3, 25, 12, 0.6)' : '0 8px 24px rgba(3,25,12,0.06)',
              borderColor: isDark ? 'rgba(255,255,255,0.06)' : undefined,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : undefined,
            borderRadius: 8,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255,255,255,0.06)' : undefined,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255,255,255,0.12)' : undefined,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? '#69f0ae' : undefined,
              boxShadow: isDark ? '0 0 0 4px rgba(15, 116, 61, 0.12)' : undefined,
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: isDark ? '#eaf8ee' : undefined,
          },
        },
      },
    },
  };

  return createTheme(base);
}

// default export for backward compatibility
export const greenTheme = getGreenTheme('dark');

// Additional retro overrides to make MUI components look 8-bit
export function applyRetroOverrides(theme: any) {
  return {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            border: '3px solid',
            padding: '10px 14px',
            textTransform: 'none',
            fontFamily: 'Press Start 2P, monospace',
            fontSize: '11px',
            boxShadow: '6px 6px 0 rgba(0,0,0,0.6)',
          },
          contained: {
            background: '#000',
            color: theme.palette?.primary?.contrastText || '#7fff7f',
            borderColor: theme.palette?.primary?.main || '#0b3d1e',
          },
          text: {
            color: theme.palette?.primary?.contrastText || '#e8f5e9',
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            border: '4px solid rgba(127,255,127,0.12)',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.6)',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.08))',
          }
        }
      }
    }
  };
}
