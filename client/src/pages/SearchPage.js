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

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({
    searchTerm: '',
    searchType: 'title',
    genres: [],
    minRating: 0,
    maxRating: 5,
    startYear: 1900,
    endYear: new Date().getFullYear(),
    sortBy: 'title',
    sortOrder: 'desc',
    page: 1,
    limit: 20
  });

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
      return;
    }

    setLoading(true);
    setError(null);
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
            maxWidth: '100%'
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
                <SearchFilterPanel
                  genres={availableGenres}
                  selectedGenres={searchParams.genres}
                  onGenreChange={handleGenreChange}
                  ratingRange={[searchParams.minRating, searchParams.maxRating]}
                  onRatingChange={handleRatingChange}
                  yearRange={[searchParams.startYear, searchParams.endYear]}
                  onYearChange={handleYearChange}
                  sortBy={searchParams.sortBy}
                  onSortByChange={handleSortByChange}
                  sortOrder={searchParams.sortOrder}
                  onSortOrderChange={handleSortOrderChange}
                />
              </Box>
            </Collapse>
          </Box>
        </Grid>

        {/* Right Side - Search and Results */}
        <Grid item xs={12} md={9}>
          {/* Search Bar */}
          <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Search Type</InputLabel>
                <Select
                  value={searchParams.searchType}
                  label="Search Type"
                  onChange={handleSearchTypeChange}
                >
                  <MenuItem value="title">Title</MenuItem>
                  <MenuItem value="author">Author</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={7}>
              <TextField
                fullWidth
                placeholder={`Search by ${searchParams.searchType}...`}
                value={searchParams.searchTerm}
                onChange={handleSearchTermChange}
                onKeyPress={handleKeyPress}
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
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                fullWidth
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Grid>
          </Grid>

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
            {!loading && !error && results.length === 0 && (
              <Typography variant="h6" textAlign="center" color="text.secondary">
                No results found. Try adjusting your search criteria.
              </Typography>
            )}
            {!loading && !error && results.length > 0 && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Found {totalResults} results
                </Typography>
                <Grid container spacing={3}>
                  {results.map((book) => (
                    <Grid item key={book.id} xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: '100%',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 6,
                            cursor: 'pointer'
                          }
                        }}
                        onClick={() => handleCardClick(book.id)}
                      >
                        <CardMedia
                          component="img"
                          height="320"
                          image={book.coverImage || 'https://via.placeholder.com/240x360?text=No+Image'}
                          alt={book.title}
                        />
                        <CardContent>
                          <Typography variant="h6" gutterBottom noWrap>
                            {book.title}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" noWrap>
                            by {book.author}
                          </Typography>
                          <Typography variant="body2">
                            ⭐ {book.rating?.toFixed(1) || 'N/A'} • {book.publishedYear || 'N/A'}
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                          <Tooltip title={favorites[book.id] ? 'Unfavorite' : 'Favorite'}>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(book.id);
                              }}
                            >
                              {favorites[book.id] ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                            </IconButton>
                          </Tooltip>
                        </CardActions>
                      </Card>
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
