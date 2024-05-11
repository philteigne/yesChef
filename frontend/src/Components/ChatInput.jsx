import React from "react";
import { DialogContent, DialogActions, TextField, Typography, Button } from "@mui/material";
import { useContext, useState, useEffect, useRef } from 'react';
import { applicationContext } from '../hooks/applicationContext';

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

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom()
  }, [state.chatHistory]);
  
  return(
    <React.Fragment>
      <DialogContent>
      {state.chatHistory.map((chat) => {
        return(
          <div>
            <Typography
              variant="body2"
              component="p"
              style={{ marginTop: 16, padding: 10 }}
              align={chat.sender === "user" ? "right" : "left"}
              color={chat.sender === "user" ? state.themeColors.bgColor : state.themeColors.textColor}
              bgcolor={chat.sender === "user" ? state.themeColors.accentColor : state.themeColors.bgColor}
            >
              {chat.message}
            </Typography>
            <div ref={messagesEndRef} />
          </div>
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