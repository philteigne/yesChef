import { Dialog, DialogTitle, DialogContent, IconButton, Slide, TextField, Select, Button, Typography, MenuItem, Box, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext, useState } from 'react';
import { applicationContext } from '../hooks/applicationContext';
import React from 'react';
import { ClassNames } from '@emotion/react';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChatModal = () => {
  const { state, dispatch } = useContext(applicationContext);

  const [userQuery, setUserQuery] = useState('');
  
  const handleInputChange = (event) => {
    setUserQuery(event.target.value);
  };
  
  const handleSubmitQuery = () => {
    if (userQuery.trim()) {
      dispatch({ type: "SET_CHAT_QUERY", payload: {sender: "user", message: userQuery} });
      setUserQuery(''); // Clear the input after submission
    }
  };

  const [chatVoice, setChatVoice] = useState(state.chatSettings.chatVoice);

  const chatVoiceList = {
    'Yes Chef Bot': 'a helpful cooking assistant to a home cook',
    'Gordon Ramsay': 'Offensive Gordon Ramsay',
    'Matty Matheson': 'Funny Chef Matty Matheson',
    'Carmen "Carmy" Berzatto': 'Angry Chef Carmen "Carmy" Berzatto',
  }

  const handleChangeSettings = (event) => {
    setChatVoice({name: event.target.value, description: chatVoiceList[event.target.value]})
  }

  const handleSettingsApply = () => {
    dispatch({ type: "SET_CHAT_SETTINGS", payload: {chatVoice: chatVoice} })
  }
  const handleSettingsCancel = () => {
    setChatVoice(state.chatSettings.chatVoice)
  }

  console.log("stateChat", state.chatSettings)


  
  return (
    <Dialog 
      open={state.chatModalOpen}
      onClose={() => dispatch({ type: "TOGGLE_CHAT"})}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        style: { 
          position: 'fixed',
          bottom: 0,
          right: 0,
          maxHeight: '90vh',
          maxWidth: '350px',
          minHeight: '300px',
          borderRadius: '10px 10px 0 0',
        }
      }}
    >
      <DialogTitle>
        Chat Assistance
        <Box style={{ position: 'absolute', right: 8, top: 8 }}>
          <IconButton onClick={() => dispatch({ type: "TOGGLE_CHAT_SETTINGS" })}>
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={() => dispatch({ type: "TOGGLE_CHAT" })} >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Select
          value={chatVoice.name}
          onChange={handleChangeSettings}
          sx={{ minWidth: 1 }}
        >
          {Object.keys(chatVoiceList).map((name) => {
            return(
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            )
          })}
        </Select>
        <Stack flexDirection="row">
          <Button onClick={handleSettingsApply}>apply</Button>
          <Button onClick={handleSettingsCancel}>reset</Button>
        </Stack>
      </DialogContent>
      {/*
      <DialogContent>
        {state.chatHistory.map((chat) => {
            return(
              <Typography
                variant="body2"
                component="p"
                style={{ marginTop: 16 }}
                align={chat.sender === "user" ? "right" : "left"}
                bgcolor={chat.sender === "user" ? state.themeColors.accentColor : state.themeColors.bgColor}
              >
                {chat.message}
              </Typography>
            )

        })}
        <TextField
          fullWidth
          label="Ask me anything about cooking!"
          variant="outlined"
          value={userQuery}
          onChange={handleInputChange}
          onKeyPress={(e) => { if (e.key === 'Enter' && userQuery.trim()) handleSubmitQuery() }}
          autoFocus
          style={{ marginTop: 8 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmitQuery} style={{ marginTop: 8 }}>
          Send
        </Button>
      </DialogContent>
      */}
    </Dialog>
  );
}


export default ChatModal;
