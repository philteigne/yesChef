import { Dialog, DialogTitle, DialogContent, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { applicationContext } from '../hooks/applicationContext';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChatModal = () => {
  const { state, dispatch } = useContext(applicationContext);

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
        <IconButton onClick={() => dispatch({ type: "TOGGLE_CHAT" })} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Chat content goes here */}
      </DialogContent>
    </Dialog>
  );
}

export default ChatModal;
