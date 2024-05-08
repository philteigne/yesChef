import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useContext } from 'react';
import { applicationContext } from '../hooks/applicationContext';

const ChatBubble = () => {
  const { dispatch } = useContext(applicationContext);

  return (
      <Fab 
        color="primary" 
        aria-label="chat" 
        onClick={() => dispatch({ type: "TOGGLE_CHAT"})}
        style={{ 
          position: 'fixed', 
          bottom: 20, 
          right: 20,
          zIndex: 1000
        }}>
          <ChatIcon />
      </Fab>
  );
}

export default ChatBubble;