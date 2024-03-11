import { createContext, type FC, type ReactNode, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { themeOptions } from './options';
import { responsiveFontSizes } from '@mui/material';

export const ThemeContext = createContext({
  switchMode: () => {},
});

interface IThemeProviderProps {
  children?: ReactNode;
}

const CustomThemeProvider: FC<IThemeProviderProps> = (props: IThemeProviderProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const theme = useMemo(() => {
    const theme = createTheme(themeOptions[mode]);
    return responsiveFontSizes(theme);
  }, [mode]);
  const themeMode = useMemo(
    () => ({
      switchMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={themeMode}>
        <ThemeProvider theme={theme}>
          <GlobalStyles styles={{}} />
          <CssBaseline enableColorScheme />
          {props.children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
};

export default CustomThemeProvider;
