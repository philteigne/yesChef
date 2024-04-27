import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '../HomeIcon';
import { useThemeContext } from '../theme/ThemeContextProvider.tsx';

import '../navagation.css';

export default function ButtonAppBar() {
  const { mode, toggleColorMode } = useThemeContext();

  const pages = [<HomeIcon fontSize="large"/>, 'Create Recipes',<DarkModeIcon onClick={toggleColorMode} />, 'Login']

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side content */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
          <Typography
            id="app-logo"
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PantryPal
          </Typography>
          </Grid>
        </Grid>
        {/* Right side content */}
        <Grid container alignItems="center" spacing={2} justifyContent="flex-end">
          {pages.map((page) => (
            <Grid item>
              <Button
                key={page}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  fontSize: '22px'
                 }}
              >
                {page}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
