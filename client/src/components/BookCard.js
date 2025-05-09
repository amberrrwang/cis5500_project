import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
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
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
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
          p: 1,
          aspectRatio: '2/3'
        }}
      >
        <CardMedia
          component="img"
          image={book.image || DEFAULT_IMAGE}
          alt={book.title}
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'contain'
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DEFAULT_IMAGE;
          }}
        />
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
            sx={{ 
              display: 'block', 
              mt: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
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