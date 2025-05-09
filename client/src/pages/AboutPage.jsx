import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box my={4}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          align="center" 
          color="primary" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '2.75rem' }
          }}
        >
          About BookVerse
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph align="center" sx={{ mb: 6 }}>
          Your Book Discovery Platform
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16, opacity: 0.1 }}>
              <EmojiObjectsIcon sx={{ fontSize: 100, color: 'primary.main' }} />
            </Box>
            <Typography variant="h5" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmojiObjectsIcon /> Our Mission
            </Typography>
            <Typography paragraph>
              At BookVerse, our mission is simple: to help every reader discover their perfect book. 
              We strive to make the book discovery process more personalized and efficient, 
              connecting you with the stories you'll love.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16, opacity: 0.1 }}>
              <LocalLibraryIcon sx={{ fontSize: 100, color: 'primary.main' }} />
            </Box>
            <Typography variant="h5" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalLibraryIcon /> Key Features
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchIcon color="primary" /> Powerful and easy-to-use book search
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MenuBookIcon color="primary" /> Convenient reading list management
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon color="primary" /> Featured and top-rated book selections
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16, opacity: 0.1 }}>
              <AutoStoriesIcon sx={{ fontSize: 100, color: 'primary.main' }} />
            </Box>
            <Typography variant="h5" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutoStoriesIcon /> Our Story
            </Typography>
            <Typography paragraph>
              BookVerse was created to simplify and enhance the way readers find books. 
              We believe that technology can make book discovery more enjoyable and rewarding, 
              connecting readers with the stories that truly resonate with them.
            </Typography>
            <Typography>
              Ready to discover your next great read?{' '}
              <Link 
                to="/" 
                style={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Start exploring
              </Link>
              {' '}the world of books with BookVerse today!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
} 