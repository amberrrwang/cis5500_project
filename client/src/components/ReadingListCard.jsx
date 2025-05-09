// src/components/ReadingListCard.jsx
import React from 'react';
import {
  Card, CardContent, CardMedia, CardActions,
  Typography, Grid, Button, IconButton, Box,
  Chip, Tooltip
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  }
}));

const PreviewGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& .MuiCardMedia-root': {
    height: 100,
    borderRadius: theme.shape.borderRadius,
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    }
  }
}));

const ReadingListCard = ({ readingList, onDelete }) => {
  const previews = readingList.preview_images || [];
  const formattedDate = new Date(readingList.created_date).toLocaleDateString();

  return (
    <StyledCard>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography
            variant="h6"
            component={Link}
            to={`/booklists/${readingList.list_id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 600,
              '&:hover': {
                color: 'primary.main',
              }
            }}
          >
            {readingList.list_name}
          </Typography>
          <Tooltip title="Delete List">
            <IconButton 
              size="small" 
              onClick={() => onDelete(readingList.list_id)}
              sx={{
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'error.light',
                  color: 'white',
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip 
            size="small" 
            label={readingList.is_public ? 'Public' : 'Private'}
            color={readingList.is_public ? 'success' : 'default'}
          />
          <Chip 
            size="small" 
            label={`Created ${formattedDate}`}
            variant="outlined"
          />
        </Box>

        {previews.length > 0 && (
          <PreviewGrid container spacing={1}>
            {previews.slice(0, 4).map((img, idx) => (
              <Grid item xs={3} key={idx}>
                <CardMedia
                  component="img"
                  image={img || 'https://via.placeholder.com/100'}
                  alt="Book preview"
                />
              </Grid>
            ))}
          </PreviewGrid>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
        <Button
          size="small"
          component={Link}
          to={`/booklists/${readingList.list_id}`}
          startIcon={<VisibilityIcon />}
          sx={{
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.light',
              color: 'white',
            }
          }}
        >
          View Details
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default ReadingListCard;