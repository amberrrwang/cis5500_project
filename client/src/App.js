import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { indigo, amber } from '@mui/material/colors';
import { createTheme } from "@mui/material/styles";
import NavBar from './components/NavBar';
import ExamplePage from './pages/ExamplePage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import { useBooks } from './hooks/useBooks'; // adjust path as needed
import BookCard from './components/BookCard'; // from book-card branch

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/example" element={<ExamplePage />} />
          <Route path="/booklists" element={<BookListPage />} />
          <Route path="/booklists/:id" element={<BookDetailPage />} />
          <Route path="/books/random" element={<RandomBookPage />} /> {/* 💡新增頁面 */}
          <Route path="/books/:title" element={<BookDetailPage />} />
          <Route path="/" element={<Navigate to="/booklists" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}