import type { FC } from 'react';
import { Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import ThemeSwitcher from '../theme-switcher';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { FlexRowCenter, FlexRowBetween } from '../styled/FlexContainer';

const Header: FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Paper component="header">
      <FlexRowBetween sx={{ p: 3 }}>
        <FlexRowCenter sx={{ columnGap: 1 }}>
          <GTranslateIcon fontSize="large" />
          <Typography variant="h4" color="inherit" component="div">
            Melingo {matches && 'Dictionary'}
          </Typography>
        </FlexRowCenter>
        <ThemeSwitcher />
      </FlexRowBetween>
    </Paper>
  );
};

export default Header;
