import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function ThemedApp() {
  const { darkMode } = useTheme();
  
  const theme = createTheme({
    direction: 'rtl',
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#1a1f2e' : '#f8fafc',
        paper: darkMode ? '#242b3d' : '#ffffff',
      },
      primary: {
        main: '#2196f3',
      },
      text: {
        primary: darkMode ? '#e3e8f3' : '#000000',
        secondary: darkMode ? '#94a3b8' : '#6b7280',
      },
    },
    typography: {
      fontFamily: "'Rubik', sans-serif",
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 500,
      }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          InputLabelProps: {
            style: { fontFamily: 'Rubik' }
          },
          inputProps: {
            style: { fontFamily: 'Rubik' }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: 'Rubik'
          }
        }
      }
    }
  });

  return (
    <CacheProvider value={cacheRtl}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </CacheProvider>
  );
}

// Wrap ThemedApp in its own component to ensure context is available
function Root() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);