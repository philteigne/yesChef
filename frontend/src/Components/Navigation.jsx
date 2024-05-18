import React, {useContext, useState} from 'react';

import { AppBar, Toolbar, Typography, Box, Icon, Dialog, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';

import YesChefLogo from '../icons/yesChefLogo';

import useLastVisitedUrl from '../hooks/useLastVisitedUrl';
import { applicationContext } from '../hooks/applicationContext';



export default function ButtonAppBar() {
  
  // mode from useThemeContext "light", "dark"
  const history = useLastVisitedUrl();
  
  
  const homeIconClick = () => {
    // Navigate to a different route
    history.push('/');
  }
  
  const viewRecipeClick = () => {
    // Navigate to a different route
    history.push('/view-recipe')
  }
  
  const createRecipeClick = () => {
    // Navigate to a different route
    history.push('/create-recipe');
  }
  
  const pages = [
    {
      id: 0,
      text: 'HOME',
      action: homeIconClick,
    },
    {
      id: 1,
      text: 'PANTRY',
      action: createRecipeClick,
    },
    {
      id: 2,
      text: 'RECIPES',
      action: viewRecipeClick,
    },
    {
      id: 3,
      text: 'LOGIN',
      action: () => setOpen(true)
    },
    {
      id: 4,
      text: 'SIGNUP',
      action: () => console.log("Signup Clicked")
    },
  ]
  
  const { state, dispatch } = useContext(applicationContext);
  const [open, setOpen] = useState(false);
  const [userIdInput, setUserIdInput] = useState('');
  return (
    <React.Fragment>
      <AppBar >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 2 }}>
          <Icon sx={{ height: 135, width: 212 }}>
            <YesChefLogo fillColor={state.themeColors.accentColor}/>
          </Icon>
          <Box sx={{ display: 'flex', justifyContent: "flex-end", justifySelf: 'flex-end', m: 0.4, position: 'absolute', top: '20%', right: '20px' }} >
            {pages.map((page) => (
              <Box sx={{ marginRight: 3 }}>
                <Typography
                  variant="h3"
                  component="h3"
                  key={page.id}
                  onClick={page.action}
                  sx={{'&:hover': {
                    cursor: 'pointer'
                  }}}
                >
                  {page.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogContentText>
            Please enter your user ID to login:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="userId"
            label="User ID"
            type="number"
            fullWidth
            value={userIdInput}
            onChange={(e) => setUserIdInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            dispatch({ type: "SET_USER_ID", payload: parseInt(userIdInput, 10) });
            setOpen(false);
            setUserIdInput('');  // Clear input field after submission
          }}>Login</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
