import React, { useContext, useState } from 'react';
import axios from 'axios';

import { Button, 
  CssBaseline, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Link, 
  Container, 
  Box, 
  Grid, 
  Typography,
  Avatar
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { applicationContext } from '../hooks/applicationContext';
import useLastVisitedUrl from '../hooks/useLastVisitedUrl';
import { API_CALL_URL } from '../hooks/customHook';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        YesChef
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInSide() {
  const { dispatch, state } = useContext(applicationContext)
  const history = useLastVisitedUrl();
  const [error, setError] = useState(null);

  // if user is alread logged in redirect to create-recipe
  if (state.isLoggedIn) {
    // return <Redirect
    //         to={ history[history.length - 1 ]}
    //       />
    history.push('/create-recipe')
    return
  } 

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const formData = {
      email: data.get('email'),
      password: data.get('password')
    }
    try {
      const response = await axios.post(`${API_CALL_URL}login/`, formData);
      
      const jwtToken = response.data.token;
      sessionStorage.setItem('jwtToken', jwtToken);
      sessionStorage.setItem('userId', response.data.id)

      // retrieve sessionStorage, if found, login is successful
      const token = sessionStorage.getItem('jwtToken');
      const currentId = sessionStorage.getItem('userId');

      if (token) {
        // set state for login to be true so user can access private routes
        dispatch({type: 'IS_LOGGED_IN', payload: true})
        // set the userId with the user that just logged in
        dispatch({type: 'SET_USER_ID', payload: Number(currentId)})
        history.push('/create-recipe');
      }
      

    } catch (err) {
      // err.response.status = 400 set error state
      if (err.response.status === 400) {
        setError(true);
        setTimeout(() => {
          setError(null)
        },4000)
      }
      console.log("Error: ", err.response.status);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 0,
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ bgcolor: state.themeColors.accentColor, height: '50px', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AccountCircle
          fontSize="large"
          sx={{ fill: state.themeColors.bgColor }}
        />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        {/* {error?  } */}
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        {error && (
          <div>
            <p style={{color: 'red'}}>Your password is incorrect or this account does not exist, please try again.</p>
          </div>
        )}
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        
      </Box>
    </Box>
    <Copyright sx={{ mt: 8, mb: 4 }} />
  </Container>
  );
}