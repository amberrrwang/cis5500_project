import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { indigo, amber } from '@mui/material/colors';
import { createTheme } from "@mui/material/styles";
import NavBar from './components/NavBar';
import ExamplePage from './pages/ExamplePage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import { useBooks } from './hooks/useBooks'; // Assuming useBooks is defined in hooks

// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
export default function App() {
  const { books, loading } = useBooks();

  const randomBook = books.length
    ? books[Math.floor(Math.random() * books.length)]
    : null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/example" element={<ExamplePage />} />
          <Route path="/booklists" element={<BookListPage />} />
          <Route path="/booklists/:id" element={<BookDetailPage />} />
          <Route path="/" element={<Navigate to="/booklists" />} />
          <Route path="/books/:title" element={<BookDetailPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
