import React, {useContext} from 'react';
import { AppBar, Toolbar, Typography, Box, Icon } from '@mui/material';
import YesChefLogo from '../icons/yesChefLogo';
import { applicationContext } from '../hooks/applicationContext';


export default function ButtonAppBar() {
  const pages = ['HOME', 'RECIPES', 'LOGIN', 'SIGNUP']

  const { state } = useContext(applicationContext);

  return (
    <AppBar >
      <Toolbar>
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
          <YesChefLogo fillColor={state.themeColors.accentColor}/>
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
