import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#88648F',
      light: '#C09BC7',
      dark: '#77517D',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#AA7DB1',
      light: '#D6B9DD',
      dark: '#77517D',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#77517D',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          background: 'linear-gradient(135deg, #88648F 0%, #C09BC7 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #77517D 0%, #AA7DB1 100%)',
          },
        },
        outlined: {
          borderColor: '#88648F',
          color: '#88648F',
          '&:hover': {
            borderColor: '#77517D',
            backgroundColor: 'rgba(136, 100, 143, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(136, 100, 143, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #88648F 0%, #C09BC7 100%)',
        },
      },
    },
  },
});

export default theme; 