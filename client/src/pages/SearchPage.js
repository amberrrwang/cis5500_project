import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip,
  CircularProgress,
  Alert,
  Paper,
  Collapse,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import SearchFilterPanel from '../components/SearchFilterPanel';
import BookCard from '../components/BookCard';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    searchTerm: '',
    searchType: 'title',
    genres: [],
    minRating: 0,
    maxRating: 5,
    minRatingCount: 0,
    maxRatingCount: 22023,
    startYear: 1900,
    endYear: new Date().getFullYear(),
    sortBy: 'rating_count',
    sortOrder: 'desc',
    page: 1,
    limit: 20
  });

  const [hasSearched, setHasSearched] = useState(false);

  const [availableGenres, setAvailableGenres] = useState([
    'Architecture',
    'Art',
    'Autobiography',
    'Biography',
    'Body',
    'Business',
    'Comics',
    'Computers',
    'Cooking',
    'Crafts',
    'Disciplines',
    'Economics',
    'Education',
    'Engineering',
    'Family',
    'Fiction',
    'Fitness',
    'Foreign Language Study',
    'Games',
    'Graphic Novels',
    'Health',
    'Hobbies',
    'History',
    'Juvenile Fiction',
    'Juvenile Nonfiction',
    'Language Arts',
    'Law',
    'Literary Criticism',
    'Mathematics',
    'Medical',
    'Mind',
    'Music',
    'Nature',
    'Performing Arts',
    'Philosophy',
    'Poetry',
    'Political Science',
    'Psychology',
    'Recreation',
    'Reference',
    'Relationships',
    'Religion',
    'Science',
    'Self-Help',
    'Social Science',
    'Spirit',
    'Sports',
    'Technology',
    'Transportation',
    'Travel'
  ]);
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchParams.searchTerm && searchParams.genres.length === 0) {
      setResults([]);
      setTotalResults(0);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/books/search`, {
        params: {
          ...searchParams,
          genres: searchParams.genres.join(','),
        }
      });
      setResults(response.data.books || []);
      setTotalResults(response.data.total || 0);
    } catch (error) {
      console.error('Search failed:', error);
      setError('Search failed. Please try again.');
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTypeChange = (event) => {
    setSearchParams(prev => ({ ...prev, searchType: event.target.value }));
  };

  const handleSearchTermChange = (event) => {
    setSearchParams(prev => ({ ...prev, searchTerm: event.target.value }));
  };

  const handleClear = () => {
    setSearchParams(prev => ({ ...prev, searchTerm: '' }));
  };

  const handleGenreChange = (event) => {
    setSearchParams(prev => ({ ...prev, genres: event.target.value }));
  };

  const handleRatingChange = (newValue) => {
    setSearchParams(prev => ({
      ...prev,
      minRating: newValue[0],
      maxRating: newValue[1]
    }));
  };

  const handleRatingCountChange = (newValue) => {
    setSearchParams(prev => ({
      ...prev,
      minRatingCount: newValue[0],
      maxRatingCount: newValue[1]
    }));
  };

  const handleYearChange = (newValue) => {
    setSearchParams(prev => ({
      ...prev,
      startYear: newValue[0],
      endYear: newValue[1]
    }));
  };

  const handleSortByChange = (event) => {
    setSearchParams(prev => ({ ...prev, sortBy: event.target.value }));
  };

  const handleSortOrderChange = (event) => {
    setSearchParams(prev => ({ ...prev, sortOrder: event.target.value }));
  };

  const handleCardClick = (id) => {
    navigate(`/books/${encodeURIComponent(id)}`);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Search Books</Typography>

      <Grid container spacing={3}>
        {/* Left Side - Filter Panel */}
        <Grid item xs={12} md={3}>
          <Box sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1,
            overflow: 'hidden',
            position: 'sticky',
            top: 20,
            width: '280px',
            maxWidth: '100%',
            flexShrink: 0,
            mr: 2
          }}>
            {/* Filter Header */}
            <Box sx={{ 
              p: 2, 
              borderBottom: 1, 
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Typography variant="h6">Filters</Typography>
              <Button
                size="small"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </Box>

            {/* Filter Content */}
            <Collapse in={showFilters}>
              <Box sx={{ p: 2 }}>
                {searchParams.searchType === 'isbn' ? (
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      textAlign: 'center',
                      py: 2,
                      px: 1
                    }}
                  >
                    Filters are not applicable when searching by ISBN
                  </Typography>
                ) : (
                  <SearchFilterPanel
                    genres={availableGenres}
                    selectedGenres={searchParams.genres}
                    onGenreChange={handleGenreChange}
                    ratingRange={[searchParams.minRating, searchParams.maxRating]}
                    onRatingChange={handleRatingChange}
                    ratingCountRange={[searchParams.minRatingCount, searchParams.maxRatingCount]}
                    onRatingCountChange={handleRatingCountChange}
                    yearRange={[searchParams.startYear, searchParams.endYear]}
                    onYearChange={handleYearChange}
                    sortBy={searchParams.sortBy}
                    onSortByChange={handleSortByChange}
                    sortOrder={searchParams.sortOrder}
                    onSortOrderChange={handleSortOrderChange}
                  />
                )}
              </Box>
            </Collapse>
          </Box>
        </Grid>

        {/* Right Side - Search and Results */}
        <Grid item xs={12} md={9}>
          {/* Search Bar */}
          <Box sx={{ 
            display: 'flex',
            gap: 2,
            mb: 2,
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}>
            <FormControl sx={{ width: '120px', flexShrink: 0 }}>
              <InputLabel>Search Type</InputLabel>
              <Select
                value={searchParams.searchType}
                label="Search Type"
                onChange={handleSearchTypeChange}
                sx={{ height: '56px' }}
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="isbn">ISBN</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              placeholder={`Search by ${searchParams.searchType}...`}
              value={searchParams.searchTerm}
              onChange={handleSearchTermChange}
              onKeyPress={handleKeyPress}
              sx={{ height: '56px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {searchParams.searchTerm && (
                      <IconButton onClick={handleClear}>
                        <ClearIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                )
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ 
                width: '120px',
                height: '56px',
                flexShrink: 0
              }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Box>

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Results */}
          <Box sx={{ marginTop: 4 }}>
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            )}
            {!loading && !error && hasSearched && results.length === 0 && (
              <Typography variant="h6" textAlign="center" color="text.secondary">
                No results found. Try adjusting your search criteria.
              </Typography>
            )}
            {!loading && !error && results.length > 0 && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Found {totalResults} results
                </Typography>
                <Grid container spacing={2}>
                  {results.map((book) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <BookCard 
                          book={{
                            title: book.title,
                            image: book.coverImage,
                            publisher: book.publisher,
                            average_rating: book.rating,
                            rating_count: book.ratingsCount
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchPage;
