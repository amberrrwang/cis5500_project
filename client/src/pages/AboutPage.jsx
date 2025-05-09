import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { styled } from '@mui/material/styles';

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  marginBottom: theme.spacing(3),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 60,
    height: 3,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
  },
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '10',
    transform: 'translateX(4px)',
  },
}));

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
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.75rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
          }}
        >
          About BookVerse
        </Typography>
        <Typography 
          variant="h6" 
          color="textSecondary" 
          paragraph 
          align="center" 
          sx={{ 
            mb: 6,
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6,
            letterSpacing: '0.01em',
          }}
        >
          Your Personal Book Discovery Platform
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16, opacity: 0.1 }}>
              <EmojiObjectsIcon sx={{ fontSize: 100, color: 'primary.main' }} />
            </Box>
            <SectionTitle variant="h5">
              Our Mission
            </SectionTitle>
            <Typography 
              paragraph
              sx={{
                lineHeight: 1.8,
                letterSpacing: '0.01em',
                fontSize: '1.1rem',
              }}
            >
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
            <SectionTitle variant="h5">
              Key Features
            </SectionTitle>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FeatureItem>
                <SearchIcon color="primary" />
                <Typography>Powerful and easy-to-use book search</Typography>
              </FeatureItem>
              <FeatureItem>
                <MenuBookIcon color="primary" />
                <Typography>Convenient reading list management</Typography>
              </FeatureItem>
              <FeatureItem>
                <StarIcon color="primary" />
                <Typography>Featured and top-rated book selections</Typography>
              </FeatureItem>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16, opacity: 0.1 }}>
              <AutoStoriesIcon sx={{ fontSize: 100, color: 'primary.main' }} />
            </Box>
            <SectionTitle variant="h5">
              Our Story
            </SectionTitle>
            <Typography 
              paragraph
              sx={{
                lineHeight: 1.8,
                letterSpacing: '0.01em',
                fontSize: '1.1rem',
              }}
            >
              BookVerse was created to simplify and enhance the way readers find books. 
              We believe that technology can make book discovery more enjoyable and rewarding, 
              connecting readers with the stories that truly resonate with them.
            </Typography>
            <Typography
              sx={{
                lineHeight: 1.8,
                letterSpacing: '0.01em',
                fontSize: '1.1rem',
                fontWeight: 500,
              }}
            >
              Ready to discover your next great read?{' '}
              <Link 
                to="/" 
                style={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
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