import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import AddToReadingListButton from '../components/AddToReadingListButton'; // Adjust the path as needed
import { useInView } from 'react-intersection-observer';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
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
  const [loadedCount, setLoadedCount] = useState(5);
  const { ref: loadMoreRef, inView } = useInView();
  const DEFAULT_IMAGE = 'https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg';

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

  useEffect(() => {
    if (inView && loadedCount < book.reviews.length) {
      setLoadedCount(prev => Math.min(prev + 5, book.reviews.length));
    }
  }, [inView, loadedCount, book.reviews.length]);
  
if (loading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Left: Book Cover */}
        <Grid item xs={12} md={2}>
        <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', height: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
          <CardMedia
            component="img"
            image={book.image ? book.image : DEFAULT_IMAGE}
            alt={book.title}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '400px', 
              height: 'fit-content', 
              objectFit: 'contain', 
            }}
          />
        </Card>
      </Grid>


        {/* Right: Book Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>{book.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {book.authors?.join(', ')}
          </Typography>
          <Box sx={{ mt: 2 , display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Published by {book.publisher} {book.published_year ? `in ${book.published_year}` : ''}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ISBN: {book.isbn || 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Language: {book.language || 'N/A'}
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 1 }}>
            {book.categories?.map(category => (
              <Chip key={category} label={category} sx={{ mr: 1 }} />
            ))}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Rating value={book.average_rating || 0} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              {book.average_rating?.toFixed(2)} / 5 from {book.rating_count} ratings
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
          <Box sx={{ mt: 2 }}>
            <AddToReadingListButton book={book} />
          </Box>

        </Grid>
      </Grid>

      {/* Reviews */}
      {book.reviews && book.reviews.length > 0 && (
  <Box sx={{ mt: 5 }}>
    <Typography variant="h5" gutterBottom>Reviews</Typography>
    <Divider sx={{ mb: 2 }} />

    {book.reviews.slice(0, loadedCount).map((review, idx) => (
      <Box key={idx} sx={{ mb: 3 }}>
        <Rating value={review.review_score} precision={0.1} readOnly />
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{review.review_summary}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{review.review_text}</Typography>
        <Typography variant="caption" color="text.secondary">
          Helpfulness: {review.review_helpfulness || 'N/A'}
        </Typography>
      </Box>
    ))}

    {loadedCount < book.reviews.length && (
      <div ref={loadMoreRef} style={{ height: '20px' }} />
    )}
  </Box>
)}

    </Box>
  );
};

export default BookDetailPage;
