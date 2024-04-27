import React from "react";
import { TextField, Button, Box, Stack, Typography } from '@mui/material';

const Parameters = () => {
  return(
    <Stack
      direction="column"
      justifyContent="center"
      width="0.5"
    >
      <Box sx={{ margin: 2, border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
        
        <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'row'}}>
          <Typography variant="h4" component="h2">Parameters</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, maxWidth: 1, p: 3 }}>
          <Stack
            direction="column"
            spacing={1}
          >
            <TextField
              variant="outlined"
              label="Recipe Tags"
              value={null}
              onChange={(e) => console.log(e)}
            />
            <TextField
              variant="outlined"
              label="Category"
              value={null}
              onChange={(e) => console.log(e)}
            />
            <TextField
              variant="outlined"
              label="Best Before"
              value={null}
              onChange={(e) => console.log(e)}
            />
          </Stack>
        </Box>
      </Box>

      <Button
        type="submit"
        onClick={null}
        variant="contained"
      >
        Submit
      </Button>
    </Stack>


  )
}

export default Parameters;