import React from 'react';
import Pantry from './Components/Pantry';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import RecipeListView from './Components/RecipeListView';
import RecipeFullView from './Components/RecipeFullView';
import ButtonAppBar from './Components/Navigation';
import { applicationContext } from './hooks/applicationContext';
import useApplicationData from './hooks/customHook';
import Parameters from './Components/Parameters';
import { Stack, Box } from '@mui/material';


import { createTheme, ThemeProvider} from '@mui/material/styles'
import './assets/fonts.css';

const theme = createTheme({
  palette: {
    common: {
      black: '#4A4A45',
      white: '#EAE7DC',
    },
    primary: {
      main: '#E85A4F',
      contrastText: "#EAE7DC"
    },
    secondary: {
      main: '#4A4A45'
    },
    text: {
      primary: '#4A4A45'
    },
    background: {
      paper: '#EAE7DC',
      default: '#EAE7DC',
    },
  },
  typography: {
    h1: {
      fontFamily: "El Messiri",
      fontSize: 27,
      fontWeight: 700,
    },
    h2: {
      fontFamily: "El Messiri",
      fontSize: 21,
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Kanit',
      fontSize: 15,
      fontWeight: 600,
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
        elevation: 0,
        position: "static"
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#4A4A45"
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: "#4A4A45"
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        color: 'secondary'
      },
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: 'darkblue',
          },
          '& .MuiInputLabel-root': {
            color: 'green',
          },
          '& .MuiOutlinedInput-root': {
            borderWidth: 5,
          },
        }
      }
    }
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       border: `2px solid #4A4A45`,
    //       fontFamily: 'El Messiri',

    //     },
    //   }
    // }
  }
})

function App() {
  
  const { state, dispatch } = useApplicationData();

  return (
    // wrapping context
    // value contains all the functions from useApplicationData that alter states
    <ThemeProvider theme={theme}>
      <applicationContext.Provider value={{state, dispatch}}>
        <Box sx={{ backgroundColor: '#EAE7DC',}}>
          <ButtonAppBar />
          <Stack
            direction="row"
          >
            <Pantry  />
            <Parameters />
          </Stack>
          <div className="App">
            <RecipeListView />
            <RecipeFullView />
          </div>
        </Box>
        </applicationContext.Provider>
    </ThemeProvider>
  );
}

export default App;
