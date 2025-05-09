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
  Link as MuiLink
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
      <Typography variant="h4" gutterBottom>
        Book Rankings
      </Typography>

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Cover</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Avg Rating</TableCell>
              <TableCell>Ratings Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, idx) => {
              return (
                <TableRow key={book.title}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <MuiLink component={Link} to={`/books/${encodeURIComponent(book.title)}`}>
                      <Avatar
                        variant="square"
                        src={book.image || 'https://via.placeholder.com/50x75?text=No+Cover'}
                        alt={book.title}
                        sx={{ width: 50, height: 75 }}
                      />
                    </MuiLink>
                  </TableCell>
                  <TableCell>
                    <MuiLink
                      component={Link}
                      to={`/books/${encodeURIComponent(book.title)}`}
                      underline="hover"
                    >
                      {book.title}
                    </MuiLink>
                  </TableCell>
                  <TableCell>{book.average_rating?.toFixed(2) ?? 'N/A'}</TableCell>
                  <TableCell>{book.rating_count ?? 0}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}