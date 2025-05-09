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
  const limit = 15;                // items per page
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
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: { xs: '2.2rem', md: '3rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            fontFamily: '"Playfair Display", "Georgia", serif',
            background: 'linear-gradient(135deg, #88648F 0%, #C09BC7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 2,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(135deg, #C09BC7 0%, #88648F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }
          }}
        >
          Featured Books
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            letterSpacing: '0.01em',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Discover our carefully curated selection of featured books
        </Typography>
      </Box>

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