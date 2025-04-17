import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

export default function BookDetailPage() {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/books/${encodeURIComponent(title)}`)
      .then(res => {
        setBook(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching book:", err);
        setLoading(false);
      });
  }, [title]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : book ? (
        <BookCard book={book} />
      ) : (
        <Typography>No book data.</Typography>
      )}
    </Box>
  );
}
