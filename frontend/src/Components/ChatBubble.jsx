import { useContext } from 'react';

import { Fab } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

import { applicationContext } from '../hooks/applicationContext';

const ChatBubble = () => {
  const { state, dispatch } = useContext(applicationContext);

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
        <ChatIcon sx={{fill: state.themeColors.bgColor}}/>
    </Fab>
  );
}

export default ChatBubble;
