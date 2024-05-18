import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import {Box} from '@mui/material'

function Loading() {
  return (
    <Box sx={{ 
      margin: 2, 
      borderRadius: '4px', 
      overflow: 'hidden',
      width: '0.43'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '38vh', 
          minWidth: '500px' ,
          marginTop: '20px',
          padding: '2.5'
          }}>
          <CircularProgress size={80} data-testid='Loading-animation'/>
        </div>
      </Box>
  );
}

export default Loading;
