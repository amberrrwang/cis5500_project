import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { indigo, amber, grey } from '@mui/material/colors';

import { createTheme } from "@mui/material/styles";
import NavBar from './components/NavBar';
import ExamplePage from './pages/ExamplePage';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';
import RequireAuth from './helpers/RequireAuth';

import SearchPage from './pages/SearchPage';
import BookDetailPage from './pages/BookDetailPage';
import BookListPage from './pages/BookListPage';
import AboutPage from './pages/AboutPage';
import BookListDetail from './components/BookListDetail'; 

import useBooks from './helpers/useBooks'; // adjust path as needed
import BookCard from './components/BookCard'; // from book-card branch

import HomePage from './pages/HomePage';


// createTheme enables you to customize the look and feel of your app past the default
export const theme = createTheme({
  palette: {
    primary: {
      main: indigo[700],
      light: indigo[500],
      dark: indigo[900],
      contrastText: '#fff',
    },
    secondary: {
      main: amber[600],
      light: amber[400],
      dark: amber[800],
      contrastText: '#000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function RandomBookPage() {
  const { books, loading } = useBooks();
  const randomBook = books.length
    ? books[Math.floor(Math.random() * books.length)]
    : null;

  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      {loading ? (
        <p>Loading...</p>
      ) : randomBook ? (
        <BookCard book={randomBook} onAdd={() => console.log('Add:', randomBook.title)} />
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}

export default function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar token={authToken} setAuthToken={setAuthToken} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/example" element={<ExamplePage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
          <Route path="/signup" element={<Signup setAuthToken={setAuthToken}/>} />
          <Route 
            path="/profile" 
            element={
              <RequireAuth token={authToken}>
                <ProfilePage token={authToken} />
              </RequireAuth>
            } 
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/books/:identifier" element={<BookDetailPage />} />
          <Route path="/booklists" element={<BookListPage />} />
          <Route path="/booklists/:id" element={<BookListDetail />} />
          <Route path="/books/random" element={<RandomBookPage />} /> 
          <Route path="/books/:title" element={<BookDetailPage />} />
          <Route path="/" element={<Navigate to="/booklists" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}