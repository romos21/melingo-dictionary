import type { ThemeOptions, Components } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles/createTheme';

const components: Components<Omit<Theme, 'components'>> = {
  MuiPaper: {
    styleOverrides: {
      root: () => ({
        borderRadius: 0,
        width: '100%',
      }),
    },
  },
};

export const themeOptions: Record<string, ThemeOptions> = {
  light: {
    palette: {
      mode: 'light',
      primary: {
        main: '#63be6a',
        contrastText: '#ffffff',
        light: '#caffb8',
        dark: '#b3c3b5',
      },
      secondary: {
        main: '#00897b',
        contrastText: '#b2dfdb',
      },
      background: {
        default: '#eaf7ea',
        paper: '#63be6a',
      },
      text: {
        primary: '#000200',
        secondary: '#1b5e20',
      },
      error: {
        main: '#d32f2f',
      },
    },
    components,
  },
  dark: {
    palette: {
      mode: 'dark',
      primary: {
        main: '#0c9641',
        contrastText: '#ffffff',
        light: '#caffb8',
        dark: '#b3c3b5',
      },
      secondary: {
        main: '#00897b',
        contrastText: '#b2dfdb',
      },
      background: {
        default: '#011301',
        paper: '#0c9641',
      },
      text: {
        primary: '#edf5ed',
        secondary: '#0b410f',
      },
      error: {
        main: '#d32f2f',
      },
    },
    components,
  },
};
