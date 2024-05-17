import React from "react";
import { useContext, useState } from 'react';

import { DialogContent, DialogActions, Select, MenuItem, Button } from "@mui/material";

import { applicationContext } from '../hooks/applicationContext';

const ChatSettings = () => {

  const { state, dispatch } = useContext(applicationContext);

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
    dispatch({ type: "SET_CHAT_VIEW", payload: "chat"})
  }

  return(
    <React.Fragment>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSettingsApply}>save</Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default ChatSettings;