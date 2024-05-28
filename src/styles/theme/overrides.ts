import { alpha } from '@mui/material/styles'
import { Components } from '@mui/material/styles/components'
export function overrides (theme: any): Components<any> {
  const modeDark = theme.palette.mode === 'dark'
  return {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch'
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          background: '#F8F8F8'
        },
        '#root': {
          width: '100%',
          height: '100%'
        },
        input: {
          '&[type=search]': {
            '&::-webkit-search-cancel-button': {
              filter: 'invert(100%) sepia(50%) saturate(500%) hue-rotate(90deg)'
            }
          }
        },
        img: {
          maxWidth: '100%',
          display: 'inline-block',
          verticalAlign: 'bottom'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900], 0.8)
        },
        invisible: {
          background: 'transparent'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          borderRadius: '5px',
          fontSize: '17px',
          color: modeDark ? theme.palette.grey[800] : theme.palette.common.white,
          backgroundColor: '#6200EE',
          '&:hover': {
            color: modeDark ? theme.palette.grey[800] : theme.palette.common.white,
            backgroundColor: '#5900D5'
          }
        },
        outlinedPrimary: {
          borderRadius: '5px',
          fontSize: '17px',
          color: '#5900D5',
          borderColor: '#5900D5'
        },
        sizeLarge: {
          minHeight: 48
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.card,
          borderRadius: Number(theme.shape.borderRadius) * 2,
          position: 'relative',
          zIndex: 0 // Fix Safari overflow: hidden with border radius
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2' }
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0)
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          alignItems: 'flex-start',
          margin: 0,
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          width: '430px'
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthXl: {
          maxWidth: '1440px!important',
          padding: '0 100px!important'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          margin: 0,
          color: modeDark ? theme.palette.grey[800] : theme.palette.grey[500],
          backgroundColor: modeDark ? theme.palette.grey[300] : theme.palette.grey[800]
        },
        arrow: {
          color: modeDark ? theme.palette.grey[300] : theme.palette.grey[800]
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2)
        },
        gutterBottom: {
          marginBottom: theme.spacing(1)
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...theme.typography.body2
        }
      }
    }
  }
}
