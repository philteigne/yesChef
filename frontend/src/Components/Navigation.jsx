import { AppBar, Toolbar, Typography, Box, Icon } from '@mui/material';
import YesChefLogo from '../assets/images/YesChefLogo.svg'

import '../navagation.css';

export default function ButtonAppBar() {
  const pages = ['HOME', 'RECIPES', 'LOGIN', 'SIGNUP']

  return (
    <AppBar >
      <Toolbar sx={{ height: 250, display: 'flex', alignItems: 'flex-start',  justifyContent: 'space-between' }}>
        <Box sx={{ visibility: 'hidden', display: 'flex', justifyContent: "flex-end", justifySelf: 'flex-end', m: 0.4 }} >
          {pages.map((page) => (
            <Box sx={{ marginRight: 3 }}>
              <Typography
                variant="h3"
                component="h3"
                key={page}
              >
                {page}
              </Typography>
            </Box>
          ))}
        </Box>
        <Icon sx={{ height: 135, width: 212}}>
          <img src={YesChefLogo} />
        </Icon>
        <Box sx={{ display: 'flex', justifyContent: "flex-end", justifySelf: 'flex-end', m: 0.4 }} >
          {pages.map((page) => (
            <Box sx={{ marginRight: 3 }}>
              <Typography
                variant="h3"
                component="h3"
                key={page}
              >
                {page}
              </Typography>
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
