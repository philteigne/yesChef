import React from "react";
import { DialogContent, DialogActions, TextField, Typography, Button, Icon, Box } from "@mui/material";
import { useContext, useState, useEffect, useRef } from 'react';
import { applicationContext } from '../hooks/applicationContext';
import MascotChatBot from '../icons/MascotChatbot';

const ChatInput = () => {

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

  // AUTO SCROLL TO BOTTOM
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.chatHistory]);
  
  return(
    <React.Fragment>
      <DialogContent>
      {state.chatHistory.map((chat) => {
        return(
          <Box display="flex" justifyContent={chat.sender === "user" ? "flex-end" : "flex-start"} >
            {chat.sender === "user" ? null: <Icon sx={{ height: 70, width: 70 }}>
              < MascotChatBot/>
            </Icon>}
            <Typography
              variant="body2"
              component="p"
              style={{ marginTop: 16, padding: "8px 12px 8px 12px", borderRadius: "12px"}}
              // align={chat.sender === "user" ? "right" : "left"}
              color={chat.sender === "user" ? state.themeColors.bgColor : state.themeColors.textColor}
              bgcolor={chat.sender === "user" ? state.themeColors.accentColor : state.themeColors.bgColor}
            >
              {chat.message}
            </Typography>
            <div ref={messagesEndRef} />
          </Box>
        )
      })}
      </DialogContent>
      <DialogActions sx={{marginBottom: 0}}>
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
      </DialogActions>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitQuery}
          padding="0"
        >
            send
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default ChatInput;