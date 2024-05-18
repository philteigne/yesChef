import React from 'react';
import { useContext } from 'react';

import { Dialog, DialogTitle, IconButton, Slide, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';

import { applicationContext } from '../hooks/applicationContext';

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
          maxWidth: '420px',
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
