import { createTheme } from '@mui/material/styles'

const customColorScheme = (themeColors) => {
  
  const theme = createTheme({
    palette: {
      common: {
        black: themeColors.textColor,
        white: themeColors.bgColor,
      },
      primary: {
        main: themeColors.accentColor,
        contrastText: themeColors.bgColor
      },
      secondary: {
        main: themeColors.textColor
      },
      text: {
        primary: themeColors.textColor
      },
      background: {
        paper: themeColors.bgColor,
        default: themeColors.bgColor,
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
        fontSize: 18,
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
            color: themeColors.textColor,
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fill: themeColors.textColor
          }
        }
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained'
        },
        styleOverrides: {
          root: {
            fontFamily: 'El Messiri',
            fontWeight: 600,
            fontSize: 22,
            paddingTop: 4,
            paddingBottom: 4,
            elevation: 0,
            width: '50%',
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
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            padding: 0,
            height: 30,
            width: 30
          }
        }
      },
      MuiIconButton: {
        defaultProps: {
          size: "small"
        },
        styleOverrides: {
          root: {
            p: 0.5,
          }
        }
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            variant: 'contained'
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            variant: "outlined"
          }
        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            marginTop: 40,
            height: 220,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }
        }
      }
    }
  })

  return theme
}

export default customColorScheme;
