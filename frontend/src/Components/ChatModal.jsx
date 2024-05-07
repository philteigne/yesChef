import { Dialog, DialogTitle, DialogContent, IconButton, Slide, TextField, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';
import { applicationContext } from '../hooks/applicationContext';
import React from 'react';


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
      dispatch({ type: "SET_CHAT_QUERY", payload: userQuery });
      setUserQuery(''); // Clear the input after submission
    }
  };

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
        <TextField
          fullWidth
          label="Ask me anything about cooking!"
          variant="outlined"
          value={userQuery}
          onChange={handleInputChange}
          onKeyPress={(e) => { if (e.key === 'Enter' && userQuery.trim()) handleSubmitQuery(); }}
          autoFocus
          style={{ marginTop: 8 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmitQuery} style={{ marginTop: 8 }}>
          Send
        </Button>
        {state.chatResponse && (
          <Typography style={{ marginTop: 16 }}>
            {state.chatResponse.answer}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}


export default ChatModal;
