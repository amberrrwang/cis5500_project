import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardMedia,
  Typography, Rating, Box
} from '@mui/material';
import { Link } from 'react-router-dom';

const DEFAULT_IMAGE = "https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg";

export default function BookCard({ book, onAdd }) {
  const handleAddToList = () => {
    console.log("📚 Add to List clicked for:", book.title);
    if (onAdd) onAdd(book);
  };

  return (
    <Card
      sx={{
        width: 200,
        minWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        margin: '4px',
        position: 'relative',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          zIndex: 2
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
            image={book.image || DEFAULT_IMAGE}
            alt={book.title}
            sx={{
              height: '100%',
              objectFit: 'contain',
              maxWidth: '100%'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_IMAGE;
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
          {book.title || 'Untitled'}
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
            value={Number(book.average_rating) || 0}
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
}

// PropTypes validation
BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    publisher: PropTypes.string,
    average_rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rating_count: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};
// 