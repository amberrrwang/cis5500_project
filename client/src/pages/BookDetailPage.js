import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Rating,
  Link,
  Divider
} from '@mui/material';

const BookDetailPage = () => {
  const { identifier } = useParams(); // gets :identifier from route
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const encodedId = encodeURIComponent(identifier);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/books/${encodedId}`);
        setBook(response.data);
      } catch (err) {
        setError('Book not found or server error.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [identifier]);
if (loading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Left: Book Cover */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={book.image}
              alt={book.title}
            />
          </Card>
        </Grid>

        {/* Right: Book Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>{book.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {book.authors?.join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Published by {book.publisher} {book.published_year ? `in ${book.published_year}` : ''}
          </Typography>

          <Box sx={{ mt: 2, mb: 1 }}>
            {book.categories?.map(category => (
              <Chip key={category} label={category} sx={{ mr: 1 }} />
            ))}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Rating value={book.average_rating || 0} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              {book.average_rating?.toFixed(2)} / 5 from {book.ratings_count} ratings
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">{book.description}</Typography>
          </Box>

          {book.info_link && (
            <Box sx={{ mt: 2 }}>
              <Link href={book.info_link} target="_blank" rel="noopener">
                More Info
              </Link>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Reviews */}
      {book.reviews && book.reviews.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" gutterBottom>Reviews</Typography>
          <Divider sx={{ mb: 2 }} />

          {book.reviews.map((review, idx) => (
            <Box key={idx} sx={{ mb: 3 }}>
              <Rating value={review.review_score} precision={0.1} readOnly />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{review.review_summary}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>{review.review_text}</Typography>
              <Typography variant="caption" color="text.secondary">
                Helpfulness: {review.review_helpfulness || 'N/A'}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BookDetailPage;