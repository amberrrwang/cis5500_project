import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Rating, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

export default function FeaturedBooks({ books, loading, scrollable = false }) {
  // Display loading indicator when data is being fetched
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Book card component to ensure consistency between FeaturedBooks and TopRatedBooks
  const BookCard = ({ book }) => (
    <Card 
      sx={{ 
        width: 200,
        minWidth: 200,
        maxWidth: 200,
        marginRight: 2,
        display: 'flex', 
        flexDirection: 'column',
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.17)',
        } 
      }}
    >
      {/* Book cover with link to book details */}
      <Box 
        component={Link} 
        to={`/books/${book.id}`} 
        sx={{ 
          textDecoration: 'none',
          display: 'flex', 
          justifyContent: 'center',
          p: 1
        }}
      >
        <Box sx={{ height: 240, width: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardMedia
            component="img"
            image={book.coverImage || "https://via.placeholder.com/150x200?text=No+Cover"}
            alt={book.title}
            sx={{ 
              height: '100%', 
              objectFit: 'contain',
              maxWidth: '100%'
            }}
          />
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
        {/* Book title with link to book details */}
        <Typography 
          gutterBottom 
          variant="subtitle1" 
          component={Link}
          to={`/books/${book.id}`}
          sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: '48px',
            color: 'inherit',
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main',
            }
          }}
        >
          {book.title}
        </Typography>
        
        {/* Author name with link to author page */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          component={Link}
          to={`/authors/${encodeURIComponent(book.author)}`}
          sx={{ 
            textDecoration: 'none',
            '&:hover': {
              color: 'primary.main',
            }
          }}
        >
          {book.author}
        </Typography>
        
        <Box display="flex" alignItems="center" mt={1}>
          <Rating value={book.rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" ml={1}>
            {book.rating.toFixed(1)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  // Different rendering for scrollable view vs grid view
  if (scrollable) {
    return (
      <>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </>
    );
  }

  // Original grid view
  return (
    <Grid container spacing={3}>
      {books.map(book => (
        <Grid item key={book.id} xs={12} sm={6} md={4}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
}