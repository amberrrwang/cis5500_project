// src/components/home/FeaturedBooks.jsx
import React, { forwardRef } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

const FeaturedBooks = forwardRef(({ books, loading, scrollable = false }, ref) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  } else{
    if (!books || books.length === 0) {
      return <Typography>No books to display.</Typography>;
    }
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        '& > *': {
          flex: {
            xs: '0 0 100%',
            sm: '0 0 calc(50% - 12px)',
            md: '0 0 calc(33.33% - 16px)',
            lg: '0 0 calc(20% - 19.2px)'
          }
        }
      }}>
        {books.map(book => (
          <Box key={book.title}>
            <BookCard book={book} />
          </Box>
        ))}
      </Box>
    </Box>
  );
});

FeaturedBooks.displayName = 'FeaturedBooks';

export default FeaturedBooks;