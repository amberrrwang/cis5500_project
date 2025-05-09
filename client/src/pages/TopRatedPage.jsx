// src/pages/RankingsPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Link as MuiLink,
  Paper,
  Rating,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function RankingsPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/rankings`, { params: { limit: 50 } });
        setBooks(data);
      } catch (err) {
        console.error('Error fetching rankings:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRankings();
  }, []);

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
          Book Rankings
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
          Discover the highest-rated books based on reader reviews
        </Typography>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" align="center" my={4}>
          {error}
        </Typography>
      )}

      {!loading && !error && books.length === 0 && (
        <Typography align="center" my={4}>
          No rankings available.
        </Typography>
      )}

      {!loading && !error && books.length > 0 && (
        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'background.default' }}>
                <TableCell width="5%" sx={{ fontWeight: 600 }}>#</TableCell>
                <TableCell width="15%" sx={{ fontWeight: 600 }}>Cover</TableCell>
                <TableCell width="40%" sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell width="20%" sx={{ fontWeight: 600 }}>Rating</TableCell>
                <TableCell width="20%" sx={{ fontWeight: 600 }}>Reviews</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, idx) => (
                <TableRow 
                  key={book.title}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transition: 'background-color 0.2s'
                    }
                  }}
                >
                  <TableCell>
                    <Chip 
                      label={idx + 1} 
                      color={idx < 3 ? "primary" : "default"}
                      sx={{ 
                        fontWeight: 600,
                        minWidth: '32px',
                        backgroundColor: idx < 3 ? 'primary.main' : 'action.selected'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <MuiLink 
                      component={Link} 
                      to={`/books/${encodeURIComponent(book.title)}`}
                      sx={{
                        display: 'block',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <Avatar
                        variant="square"
                        src={book.image || 'https://via.placeholder.com/50x75?text=No+Cover'}
                        alt={book.title}
                        sx={{ 
                          width: 60, 
                          height: 90,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          borderRadius: 1
                        }}
                      />
                    </MuiLink>
                  </TableCell>
                  <TableCell>
                    <MuiLink
                      component={Link}
                      to={`/books/${encodeURIComponent(book.title)}`}
                      underline="hover"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 500,
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      {book.title}
                    </MuiLink>
                    {book.publisher && (
                      <Typography variant="caption" color="text.secondary" display="block">
                        {book.publisher}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating 
                        value={book.average_rating || 0} 
                        precision={0.1} 
                        readOnly 
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {book.average_rating?.toFixed(2) ?? 'N/A'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {book.rating_count?.toLocaleString() ?? 0} reviews
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}