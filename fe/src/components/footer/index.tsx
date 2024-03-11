import type { FC } from 'react';
import { FlexColumnCenter, FlexRowCenter } from '../styled/FlexContainer';
import { Paper, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: FC = () => {
  return (
    <Paper component="footer">
      <FlexColumnCenter sx={{ margin: 'auto', p: 3, rowGap: 1, width: '70%' }}>
        <Typography align="center" variant="subtitle1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus, finibus ornare vestibulum et,
          feugiat quis dui.
        </Typography>
        <FlexRowCenter sx={{ columnGap: 1 }}>
          <InstagramIcon />
          <XIcon />
          <FacebookIcon />
          <GitHubIcon />
        </FlexRowCenter>
      </FlexColumnCenter>
    </Paper>
  );
};

export default Footer;
