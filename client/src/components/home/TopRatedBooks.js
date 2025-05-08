// src/components/home/TopRatedBooks.jsx
import React from 'react';
import {
  Grid, Card, CardContent, CardMedia,
  Typography, Rating, Box, CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function TopRatedBooks({ books, loading, scrollable = false }) {
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

  const BookCard = ({ book }) => {

    return (
      <Card
        sx={{
          width: 200,
          minWidth: 200,
          marginRight: scrollable ? 2 : 0,
          display: 'flex',
          flexDirection: 'column',
          transition: '0.3s',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.17)',
          }
        }}
      >
        {/* Cover */}
        <Box
          component={Link}
          to={`/books/${encodeURIComponent(book.title)}`}
          sx={{
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'center',
            p: 1
          }}
        >
          <Box
            sx={{
              height: 240,
              width: 160,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CardMedia
              component="img"
              image={book.image || 'https://via.placeholder.com/150x200?text=No+Cover'}
              alt={book.title}
              sx={{
                height: '100%',
                objectFit: 'contain',
                maxWidth: '100%'
              }}
            />
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
          {/* Title */}
          <Typography
            gutterBottom
            variant="subtitle1"
            component={Link}
            to={`/books/${encodeURIComponent(book.title)}`}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              height: '48px',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {book.title}
          </Typography>

          {/* Publisher */}
          {book.publisher && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mt: 0.5 }}
            >
              {book.publisher}
            </Typography>
          )}

          {/* Rating */}
          <Box display="flex" alignItems="center" mt={1}>
            <Rating
              value={book.average_rating || 0}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary" ml={1}>
              {book.average_rating?.toFixed(1) ?? '0.0'} ({book.rating_count || 0})
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Scrollable strip
  if (scrollable) {
    return (
      <>
        {books.map(book => (
          <BookCard key={book.title} book={book} />
        ))}
      </>
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
}