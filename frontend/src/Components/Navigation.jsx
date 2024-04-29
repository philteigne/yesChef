import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';

import '../navagation.css';

export default function ButtonAppBar() {
  const pages = ['HOME', 'RECIPES', 'LOGIN', 'SIGNUP']

  return (
    <AppBar>
      <Toolbar>
        <Grid container alignItems="center" spacing={2} justifyContent="flex-end">
          {pages.map((page) => (
            <Grid item>
              <Typography
                variant="h3"
                component="h3"
                key={page}
              >
                {page}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
