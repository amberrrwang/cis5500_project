import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box my={4}>
        <Box display="flex" justifyContent="center" mb={3}>
          <AutoStoriesIcon sx={{ fontSize: 80, color: 'primary.main' }} />
        </Box>
        <Typography variant="h3" component="h1" gutterBottom align="center" color="primary" sx={{ fontWeight: 'bold' }}>
          About BookVerse
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph align="center" sx={{ mb: 6 }}>
          Your Ultimate Book Discovery Platform
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
              At BookVerse, we believe that every reader deserves to find their perfect book. Our mission is to create a vibrant community where book lovers can discover, share, and discuss their favorite reads. We're dedicated to making the book discovery process more engaging and personalized than ever before.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16, opacity: 0.1 }}>
              <LocalLibraryIcon sx={{ fontSize: 100, color: 'primary.main' }} />
            </Box>
            <Typography variant="h5" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalLibraryIcon /> What We Offer
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchIcon color="primary" /> Curated book recommendations based on your preferences
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon color="primary" /> Detailed book information and ratings
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <RateReviewIcon color="primary" /> User reviews and discussions
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MenuBookIcon color="primary" /> Personalized reading lists
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon color="primary" /> Featured and top-rated books
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchIcon color="primary" /> Easy-to-use search functionality
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
              BookVerse was born from a simple idea: to make book discovery more accessible and enjoyable. Our team of book enthusiasts and technology experts came together to create a platform that combines the best of both worlds - the joy of discovering new books and the power of modern technology.
            </Typography>
            <Typography paragraph>
              We understand that finding your next great read can be overwhelming with the countless options available. That's why we've built BookVerse to be your trusted companion in your reading journey, helping you discover books that match your interests and preferences.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16, opacity: 0.1 }}>
              <GroupsIcon sx={{ fontSize: 100, color: 'primary.main' }} />
            </Box>
            <Typography variant="h5" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GroupsIcon /> Join Our Community
            </Typography>
            <Typography paragraph>
              Whether you're a casual reader or a book enthusiast, BookVerse welcomes you to join our growing community. Share your thoughts, discover new books, and connect with fellow readers who share your passion for literature.
            </Typography>
            <Typography>
              Start your journey with BookVerse today and discover your next favorite book!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
} 