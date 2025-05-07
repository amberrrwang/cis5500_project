
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { indigo, amber } from '@mui/material/colors';

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
import useBooks from './helpers/useBooks'; // adjust path as needed
import BookCard from './components/BookCard'; // from book-card branch

import HomePage from './pages/HomePage';


// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
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
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/example" element={<ExamplePage />} />

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
          <Route path="/booklists/:id" element={<BookDetailPage />} />
          <Route path="/books/random" element={<RandomBookPage />} /> 
          <Route path="/books/:title" element={<BookDetailPage />} />
          <Route path="/" element={<Navigate to="/booklists" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}