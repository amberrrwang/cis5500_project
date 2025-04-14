import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const DEFAULT_IMAGE = "https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg";

export default function BookCard({ book, onAdd }) {
  const handleAddToList = () => {
    console.log("📚 Add to List clicked for:", book.title);
    if (onAdd) onAdd(book);
  };

  // Robust author parsing
  let authors = 'Unknown';
  try {
    authors = Array.isArray(book.authors)
      ? book.authors.join(', ')
      : JSON.parse(book.authors)?.join(', ') || String(book.authors);
  } catch {
    authors = String(book.authors).replace(/[\[\]']/g, '');
  }

  return (
    <Card
      sx={{
        width: 220,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 250,
          objectFit: 'contain',
          padding: 1,
          backgroundColor: '#f9f9f9',
        }}
        image={book.image?.trim() || DEFAULT_IMAGE}
        alt={book.title || 'No title available'}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DEFAULT_IMAGE;
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        {/* Top: Title + Author */}
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
            title={book.title}
          >
            {book.title || 'Untitled'}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            title={authors}
          >
            {authors}
          </Typography>
        </Box>

        {/* Bottom: Rating */}
        <Box>
          <Rating
            name="average-rating"
            value={Number(book.average_rating) || 0}
            precision={0.5}
            readOnly
            size="small"
            sx={{ mb: 0.2 }}
          />
          <Typography variant="caption" color="text.secondary">
            {book.average_rating ? `${book.average_rating} / 5` : 'No ratings'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center' }}>
        <Button size="small" variant="contained" onClick={handleAddToList}>
          Add to List
        </Button>
      </CardActions>
    </Card>
  );
}

// PropTypes validation
BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    image: PropTypes.string,
    average_rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onAdd: PropTypes.func,
};
// 