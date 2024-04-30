import React from 'react';
import Pantry from './Components/Pantry';

import RecipeListView from './Components/RecipeListView';
import RecipeFullView from './Components/RecipeFullView';
import ButtonAppBar from './Components/Navigation';
import { applicationContext } from './hooks/applicationContext';
import useApplicationData from './hooks/customHook';
import Parameters from './Components/Parameters';
import { Stack, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'


import { createTheme, ThemeProvider} from '@mui/material/styles'
import './assets/fonts/fonts.css';

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
      fontSize: 22,
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Kanit',
      fontSize: 15,
      fontWeight: 600,
    },
    body1: {
      fontFamily: "El Messiri",
      fontFamily: 18,
      fontWeight: 600,
    },
    button: {
      textTransform: 'none'
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
          color: "#4A4A45",
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
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'El Messiri',
          fontWeight: 600,
          fontSize: 22,
          paddingTop: 4,
          paddingBottom: 4,
          elevation: 0
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'El Messiri',
          fontSize: 22,
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
        }
      }
    }
    // MuiTextField: {
    //   defaultProps: {
    //     color: 'primary'
    //   },
    //   styleOverrides: {
    //     root: {
    //       '& .MuiInputBase-input': {
    //         color: 'darkblue',
    //       },
    //       '& .MuiInputLabel-root': {
    //         color: '#4A4A45',
    //         fontFamily: 'El Messiri',
    //         fontWeight: 600,
    //         fontSize: 21,
    //       },
    //       '& .MuiOutlinedInput-root': {
    //         borderWidth: 5,
    //       },
    //       '& .MuiInputBase-input .MuiOutlinedInput-input': {
    //         borderWidth: 5
    //       }
    //     }
    //   }
    // },
    // MuiOutlinedInput: {
    //   defaultProps: {
    //     color: 'secondary',
    //   },
    //   styleOverrides: {
    //     root: {
    //       borderWidth: 5
    //     }
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
      <CssBaseline />
      <applicationContext.Provider value={{state, dispatch}}>
        <Box sx={{ backgroundColor: '#EAE7DC',}}>
          <ButtonAppBar />
          <Stack
            direction="row"
            justifyContent='center'
            spacing={12}
          >
            <Pantry  />
            <Parameters />
          </Stack>
          <Stack
            direction="row"
            justifyContent='center'
            spacing={12}
          >
            <RecipeListView />
            <RecipeFullView />
          </Stack>
        </Box>
        </applicationContext.Provider>
    </ThemeProvider>
  );
}

export default App;
