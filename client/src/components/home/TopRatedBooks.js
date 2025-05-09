// src/components/home/TopRatedBooks.jsx
import React, { forwardRef } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import BookCard from '../../components/BookCard';

const TopRatedBooks = forwardRef(({ books, loading, scrollable = false }, ref) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }
  if (!books || books.length === 0) {
    return <Typography>No top‑rated books to display.</Typography>;
  }

  // Scrollable strip
  if (scrollable) {
    return (
      <Box 
        ref={ref}
        sx={{ 
          display: 'flex', 
          gap: 2, 
          overflowX: 'auto', 
          pb: 2,
          pt: 2,
          px: 2,
          mx: -2,
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {books.map(book => (
          <BookCard key={book.title} book={book} />
        ))}
      </Box>
    );
  }

  // Grid view
  return (
    <Grid container spacing={3}>
      {books.map(book => (
        <Grid item key={book.title} xs={12} sm={6} md={4}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
});

TopRatedBooks.displayName = 'TopRatedBooks';

export default TopRatedBooks;