import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', minHeight: '500px', minWidth: '500px' }}>
      <CircularProgress size={80} />
    </div>
  );
}

export default Loading;
