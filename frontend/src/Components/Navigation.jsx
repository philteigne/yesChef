import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '../HomeIcon';
import { useHistory } from 'react-router-dom';

import '../navagation.css';

export default function ButtonAppBar() {
  // mode from useThemeContext "light", "dark"
  const history = useHistory();

  const homeIconClick = () => {
    // Navigate to a different route
    history.push('/');
  }

  const createRecipeClick = () => {
    // Navigate to a different route
    history.push('/create-recipe');
  }
  
  const pages = [<HomeIcon fontSize="large" onClick={homeIconClick}/>, <p onClick={createRecipeClick}>Create Recipes</p>,<DarkModeIcon />, 'Login']

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side content */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
          <Typography
            onClick={homeIconClick}
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
