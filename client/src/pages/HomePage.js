import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FeaturedBooks from '../components/home/FeaturedBooks';
import TopRatedBooks from '../components/home/TopRatedBooks';
import axios from 'axios';

export default function HomePage() {
  // State management - will be replaced with API calls later
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // References for scroll containers
  const featuredRef = useRef(null);
  const topRatedRef = useRef(null);

  // Scroll amount for each click
  const scrollAmount = 800;

  // Scroll functions for featured books
  const scrollFeaturedLeft = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollFeaturedRight = () => {
    if (featuredRef.current) {
      featuredRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Scroll functions for top rated books
  const scrollTopRatedLeft = () => {
    if (topRatedRef.current) {
      topRatedRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollTopRatedRight = () => {
    if (topRatedRef.current) {
      topRatedRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${encodeURIComponent(`featured-books`)}`);
        setFeaturedBooks(response.data);
      } catch (error) {
        console.error('Error fetching featured books:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchTopBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${encodeURIComponent(`top-rated-books`)}`);
        setTopRatedBooks(response.data);
      } catch (error) {
        console.error('Error fetching featured books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
    fetchTopBooks();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box my={6} sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            mb: 2,
            fontSize: { xs: '2.2rem', md: '3rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            fontFamily: '"Playfair Display", "Georgia", serif',
            background: 'linear-gradient(135deg, #88648F 0%, #C09BC7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(135deg, #C09BC7 0%, #88648F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }
          }}
        >
          Discover your next great read
        </Typography>
      </Box>

      {/* Featured Books Section */}
      <Box my={6}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
              letterSpacing: '-0.01em',
              background: 'linear-gradient(135deg, #88648F 0%, #C09BC7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 40,
                height: 3,
                background: 'linear-gradient(135deg, #88648F 0%, #C09BC7 100%)',
                borderRadius: 2,
              }
            }}
          >
            Featured Books
          </Typography>
          <Button
            component={Link}
            to="/featured"
            endIcon={<ChevronRightIcon />}
            color="primary"
            sx={{
              fontWeight: 500,
              letterSpacing: '0.02em',
              '&:hover': {
                transform: 'translateX(4px)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            View All
          </Button>
        </Box>

        <Box position="relative">
          {/* Left scroll button */}
          <IconButton
            onClick={scrollFeaturedLeft}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'white',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'translateY(-50%) scale(1.1)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* Scrollable container */}
          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              px: 4,
              py: 2,
              mx: 2,
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none'
            }}
          >
            <FeaturedBooks ref={featuredRef} books={featuredBooks} loading={loading} scrollable={true} />
          </Box>

          {/* Right scroll button */}
          <IconButton
            onClick={scrollFeaturedRight}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'white',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'translateY(-50%) scale(1.1)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Top Rated Books Section */}
      <Box my={6}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
              letterSpacing: '-0.01em',
              background: 'linear-gradient(135deg, #88648F 0%, #C09BC7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 40,
                height: 3,
                background: 'linear-gradient(135deg, #88648F 0%, #C09BC7 100%)',
                borderRadius: 2,
              }
            }}
          >
            Top Rated Books
          </Typography>
          <Button
            component={Link}
            to="/rankings"
            endIcon={<ChevronRightIcon />}
            color="primary"
            sx={{
              fontWeight: 500,
              letterSpacing: '0.02em',
              '&:hover': {
                transform: 'translateX(4px)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            View All
          </Button>
        </Box>

        <Box position="relative">
          {/* Left scroll button */}
          <IconButton
            onClick={scrollTopRatedLeft}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'white',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'translateY(-50%) scale(1.1)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* Scrollable container */}
          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              px: 4,
              py: 2,
              mx: 2,
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none'
            }}
          >
            <TopRatedBooks ref={topRatedRef} books={topRatedBooks} loading={loading} scrollable={true} />
          </Box>

          {/* Right scroll button */}
          <IconButton
            onClick={scrollTopRatedRight}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 2,
              backgroundColor: 'white',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'translateY(-50%) scale(1.1)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>

      {/* About Us Section */}

      <Box sx={{ 
        background: 'linear-gradient(135deg, #88648F 0%, #C09BC7 100%)',
        py: 4,
        mt: 6,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0px 4px 20px rgba(136, 100, 143, 0.2)',
        width: '100vw',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        marginBottom: '-24px',
        borderRadius: 0
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("https://www.transparenttextures.com/patterns/book.png")',
            opacity: 0.1,
            zIndex: 0
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box display="flex" justifyContent="center" mb={1}>
            <AutoStoriesIcon sx={{ 
              fontSize: 36, 
              color: 'white', 
              opacity: 0.9,
              animation: 'float 3s ease-in-out infinite',
              '@keyframes float': {
                '0%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' },
                '100%': { transform: 'translateY(0px)' }
              }
            }} />
          </Box>

          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom 
            align="center" 
            color="white" 
            sx={{ 
              fontWeight: 600,
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
              letterSpacing: '-0.01em',
              textShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              mb: 1
            }}
          >
            About BookVerse
          </Typography>
          <Typography 
            variant="body1" 
            paragraph 
            align="center" 
            color="white" 
            sx={{ 
              mb: 2, 
              fontSize: '1.1rem',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              letterSpacing: '0.01em',
              fontWeight: 400
            }}
          >
            Your destination for discovering and exploring books. Join our community of readers and find your next favorite read.
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              component={Link}
              to="/about"
              variant="contained"
              color="primary"
              size="medium"
              sx={{
                px: 3,
                py: 1,
                backgroundColor: 'white',
                color: 'primary.main',
                fontWeight: 500,
                letterSpacing: '0.02em',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s ease-in-out',
                  backgroundColor: 'white',
                  color: 'primary.dark'
                }
              }}
            >
              Learn More About Us
            </Button>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}