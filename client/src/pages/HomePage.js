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
import GroupIcon from '@mui/icons-material/Group';
import FeaturedBooks from '../components/home/FeaturedBooks';
import TopRatedBooks from '../components/home/TopRatedBooks';
import axios from 'axios';

// Mock data for development - more items to demonstrate scrolling
const mockFeaturedBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.5
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
    rating: 4.8
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    coverImage: "https://m.media-amazon.com/images/I/519zR2oIlmL._AC_UF894,1000_QL80_.jpg",
    rating: 4.6
  },
  {
    id: 8,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    coverImage: "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.9
  },
  {
    id: 9,
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImage: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
    rating: 4.7
  },
  {
    id: 10,
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    coverImage: "https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UF1000,1000_QL80_.jpg",
    rating: 4.8
  }
];

const mockTopRatedBooks = [
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.7
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage: "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
    rating: 4.9
  },
  {
    id: 6,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    coverImage: "https://m.media-amazon.com/images/I/81Fyh2mrw4L._AC_UF1000,1000_QL80_.jpg",
    rating: 4.8
  },
  {
    id: 7,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage: "https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.5
  },
  {
    id: 11,
    title: "Brave New World",
    author: "Aldous Huxley",
    coverImage: "https://m.media-amazon.com/images/I/91D4YvdC0dL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.6
  },
  {
    id: 12,
    title: "Moby Dick",
    author: "Herman Melville",
    coverImage: "https://m.media-amazon.com/images/I/61KRdIDcX-L._AC_UF1000,1000_QL80_.jpg",
    rating: 4.5
  },
  {
    id: 13,
    title: "War and Peace",
    author: "Leo Tolstoy",
    coverImage: "https://m.media-amazon.com/images/I/A1aDb5a4lWL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.9
  },
  {
    id: 14,
    title: "The Odyssey",
    author: "Homer",
    coverImage: "https://m.media-amazon.com/images/I/71+WyPFupUL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.7
  }
];

export default function HomePage() {
  // State management - will be replaced with API calls later
  const [featuredBooks, setFeaturedBooks] = useState(mockFeaturedBooks);
  const [topRatedBooks, setTopRatedBooks] = useState(mockTopRatedBooks);
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
    const fetchFeaturedBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/books/featured`);
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/books/featured`);
        setTopRatedBooks(response.data);
      } catch (error) {
        console.error('Error fetching featured books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedBooks();
    fetchTopBooks();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box my={6} sx={{ textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #3f51b5 30%, #5c6bc0 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Welcome to BookVerse
        </Typography>
        <Typography 
          variant="h6" 
          color="textSecondary" 
          paragraph 
          sx={{ 
            maxWidth: '600px', 
            mx: 'auto',
            lineHeight: 1.6
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
              gap: 1
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
              zIndex: 1,
              backgroundColor: 'rgba(255,255,255,0.9)',
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
            ref={featuredRef}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              px: 6,
              py: 2,
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none',
              '& > *': {
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                }
              }
            }}
          >
            <FeaturedBooks books={featuredBooks} loading={loading} scrollable={true} />
          </Box>
          
          {/* Right scroll button */}
          <IconButton 
            onClick={scrollFeaturedRight}
            sx={{ 
              position: 'absolute', 
              right: 0, 
              top: '50%', 
              transform: 'translateY(-50%)',
              zIndex: 1,
              backgroundColor: 'rgba(255,255,255,0.9)',
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
              gap: 1
            }}
          >
            Top Rated Books
          </Typography>
          <Button 
            component={Link} 
            to="/top-rated"
            endIcon={<ChevronRightIcon />}
            color="primary"
            sx={{
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
              zIndex: 1,
              backgroundColor: 'rgba(255,255,255,0.9)',
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
            ref={topRatedRef}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              px: 6,
              py: 2,
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none',
              '& > *': {
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                }
              }
            }}
          >
            <TopRatedBooks books={topRatedBooks} loading={loading} scrollable={true} />
          </Box>
          
          {/* Right scroll button */}
          <IconButton 
            onClick={scrollTopRatedRight}
            sx={{ 
              position: 'absolute', 
              right: 0, 
              top: '50%', 
              transform: 'translateY(-50%)',
              zIndex: 1,
              backgroundColor: 'rgba(255,255,255,0.9)',
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
      <Box my={8} sx={{ 
        background: 'linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)',
        py: 8,
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
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
          <Box display="flex" justifyContent="center" mb={3}>
            <AutoStoriesIcon sx={{ 
              fontSize: 60, 
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
            variant="h4" 
            component="h2" 
            gutterBottom 
            align="center" 
            color="white" 
            sx={{ 
              fontWeight: 'bold',
              textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
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
              mb: 4, 
              fontSize: '1.1rem',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Your ultimate destination for discovering and exploring books. Join our community of readers and find your next favorite read.
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
            <GroupIcon sx={{ 
              color: 'white', 
              fontSize: 24,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' }
              }
            }} />
            <Button
              component={Link}
              to="/about"
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s ease-in-out',
                  backgroundColor: '#ffb74d'
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