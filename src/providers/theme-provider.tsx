'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '@mui/material';

type ThemeContextType = {
  toggleTheme: () => void;
  isDarkMode: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  isDarkMode: false,
});

export const useTheme = () => useContext(ThemeContext);

const getTheme = (isDarkMode: boolean) =>
  createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#67171F',
        light: '#8B2229',
        dark: '#4A1116',
        contrastText: isDarkMode ? '#ffffff' : '#2d2d2d',
      },
      secondary: {
        main: '#C5A572',
        light: '#D4BC94',
        dark: '#B69260',
        contrastText: isDarkMode ? '#ffffff' : '#2d2d2d',
      },
      background: {
        default: isDarkMode ? '#1a1a1a' : '#f5f5f5',
        paper: isDarkMode ? '#2d2d2d' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#2d2d2d',
        secondary: isDarkMode ? '#ffffff' : '#2d2d2d',
      },
    },
    typography: {
      allVariants: {
        color: isDarkMode ? '#ffffff' : '#2d2d2d',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: isDarkMode ? '#6b6b6b #2b2b2b' : '#959595 #f5f5f5',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              backgroundColor: isDarkMode ? '#2b2b2b' : '#f5f5f5',
              width: 8,
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: isDarkMode ? '#6b6b6b' : '#959595',
              border: '2px solid transparent',
              backgroundClip: 'content-box',
            },
            '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
              backgroundColor: isDarkMode ? '#808080' : '#757575',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#2d2d2d',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#2d2d2d',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#ffffff' : '#2d2d2d',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#1976d2',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            '&.MuiButton-text': {
              backgroundColor: 'transparent',
              color: isDarkMode ? '#ffffff' : '#2d2d2d',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
            },
            '&.MuiButton-outlined': {
              backgroundColor: 'transparent',
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                borderColor: '#1565c0',
              },
            },
            '&.Mui-disabled': {
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
              color: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)',
            },
          },
        },
        defaultProps: {
          variant: 'contained',
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#ffffff' : '#2d2d2d',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: isDarkMode ? '#ffffff' : '#2d2d2d',
          },
          secondary: {
            color: isDarkMode ? '#ffffff' : '#2d2d2d',
          },
        },
      },
    },
  });

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDarkMode));
    setMounted(true);
  }, [prefersDarkMode]);

  const theme = useMemo(() => getTheme(isDarkMode), [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev: boolean) => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  if (!mounted) {
    return (
      <ThemeProvider theme={getTheme(prefersDarkMode)}>
        <CssBaseline />
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
