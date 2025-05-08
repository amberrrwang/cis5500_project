// src/components/ReadingListCard.jsx
import React from 'react';
import {
  Card, CardContent, CardMedia, CardActions,
  Typography, Grid, Button, IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const ReadingListCard = ({ readingList, onDelete }) => {
  // Default to empty array so slice never fails
  const previews = readingList.preview_images || [];

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          component={Link}
          to={`/booklists/${readingList.list_id}`}
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          {readingList.list_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {readingList.description}
        </Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {previews.slice(0, 4).map((img, idx) => (
            <Grid item xs={3} key={idx}>
              <CardMedia
                component="img"
                height="100"
                image={img || 'https://via.placeholder.com/100'}
                alt="Book preview"
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/booklists/${readingList.list_id}`}>
          View Details
        </Button>
        <IconButton onClick={() => onDelete(readingList.list_id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ReadingListCard;