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
import FeaturedBooks from '../components/home/FeaturedBooks';
import TopRatedBooks from '../components/home/TopRatedBooks';

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
    // This will be replaced with actual API calls when backend is ready
    // Example:
    // const fetchBooks = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/books/featured`);
    //     setFeaturedBooks(response.data);
    //   } catch (error) {
    //     console.error('Error fetching featured books:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchBooks();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Welcome to BookVerse
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph align="center">
          Discover your next great read
        </Typography>
      </Box>

      {/* Featured Books Section */}
      <Box my={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="h2">
            Featured Books
          </Typography>
          <Button 
            component={Link} 
            to="/featured"
            endIcon={<ChevronRightIcon />}
            color="primary"
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
              backgroundColor: 'rgba(255,255,255,0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
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
              // Remove scrollbar visibility
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none', // Firefox
              '-ms-overflow-style': 'none', // IE and Edge
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
              backgroundColor: 'rgba(255,255,255,0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              }
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Top Rated Books Section */}
      <Box my={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="h2">
            Top Rated Books
          </Typography>
          <Button 
            component={Link} 
            to="/top-rated"
            endIcon={<ChevronRightIcon />}
            color="primary"
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
              backgroundColor: 'rgba(255,255,255,0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
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
              // Remove scrollbar visibility
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              scrollbarWidth: 'none', // Firefox
              '-ms-overflow-style': 'none', // IE and Edge
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
              backgroundColor: 'rgba(255,255,255,0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              }
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
}