import * as React from 'react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { applicationContext } from '../hooks/applicationContext';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import kirby from '../assets/images/Everyone_loves_to_cook.webp'
const API_CALL_URL = "http://localhost:8080/api/";

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
  const history = useHistory();
  const [error, setError] = useState(null);

  // if user is alread logged in redirect to create-recipe
  if (state.isLoggedIn) {
    history.push('/create-recipe')
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
      const currentId = sessionStorage.getItem('id');

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
      <Box sx={{ m: 1, mt: 0, pt: 0, width: 115, height: 115, borderRadius: 10 }}>
      <img src={kirby} alt="kirby as a chef" style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
      </Box>
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