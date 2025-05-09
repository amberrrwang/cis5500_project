// src/pages/FeaturedPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress
} from '@mui/material';
import FeaturedBooks from '../components/home/FeaturedBooks';
import axios from 'axios';

export default function FeaturedPage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;                // items per page
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPage = async (pg) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/featured`, {
        params: { page: pg, limit }
      });
      // On first page, replace; thereafter append
      setBooks(prev => pg === 1 ? data.books : [...prev, ...data.books]);
      setTotal(data.total);
      setPage(data.page);
    } catch (err) {
      console.error('Error fetching featured books:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // fetch first page on mount
  useEffect(() => {
    fetchPage(1);
  }, []);

  // determine if more to load
  const moreToLoad = books.length < total;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Featured Books
      </Typography>

      {/* loading spinner */}
      {loading && books.length === 0 && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* error */}
      {error && (
        <Typography color="error" align="center" my={4}>
          {error}
        </Typography>
      )}

      {/* no books */}
      {!loading && !error && books.length === 0 && (
        <Typography align="center" my={4}>
          No books to display.
        </Typography>
      )}

      {/* books grid */}
      {books.length > 0 && (
        <FeaturedBooks books={books} loading={false} scrollable={false} />
      )}

      {/* Load More */}
      {moreToLoad && !loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            onClick={() => fetchPage(page + 1)}
          >
            Load More
          </Button>
        </Box>
      )}

      {/* loading spinner for subsequent pages */}
      {loading && books.length > 0 && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Container>
  );
}