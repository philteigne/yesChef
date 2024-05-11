import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Slide, TextField, Select, Button, Typography, MenuItem, Box, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext } from 'react';
import { applicationContext } from '../hooks/applicationContext';
import React from 'react';

import ChatInput from './ChatInput';
import ChatSettings from './ChatSettings';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChatModal = () => {
  const { state, dispatch } = useContext(applicationContext);

  return(
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
          <IconButton onClick={() => dispatch({ type: "SET_CHAT_VIEW", payload: state.chatView === "chat" ? "settings" : "chat" })}>
            <SettingsIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch({ type: "TOGGLE_CHAT" })
              dispatch({ type: "SET_CHAT_VIEW", payload: "chat" })
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      {/* CHAT VIEW */}
      {state.chatView === "chat" && <ChatInput />}
      {/* SETTINGS VIEW */}
      {state.chatView === "settings" && <ChatSettings />}
    </Dialog>
  )

}


export default ChatModal;
