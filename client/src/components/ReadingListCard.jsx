// ReadingListCard.js
import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Typography, Grid, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const ReadingListCard = ({ readingList, onDelete }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          component={Link}
          to={`/reading-list/${readingList.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {readingList.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {readingList.description}
        </Typography>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {(readingList.preview_images || []).slice(0, 4).map((image, index) => (
            <Grid item xs={3} key={index}>
              <CardMedia
                component="img"
                height="100"
                image={image || 'https://via.placeholder.com/100'}
                alt="Book preview"
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/reading-list/${readingList.id}`}>
          View Details
        </Button>
        <IconButton onClick={() => onDelete(readingList.id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ReadingListCard;