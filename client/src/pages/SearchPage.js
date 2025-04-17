import React, { useState } from 'react';
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
  Collapse,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState({
    keyword: '',
    genre: '',
    min_rating: '',
    max_rating: '',
    start_year: '',
    end_year: '',
    sort_by: 'rating',
    order: 'desc',
    limit: 10
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setQuery({ ...query, keyword: '' });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = { ...query };
      if (query.keyword) {
        params.title = query.keyword;
        params.author = query.keyword;
      }
      delete params.keyword;

      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== '')
      );

      const res = await axios.get('http://localhost:8080/api/books/search', { params: filteredParams });
      setResults(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/books/${encodeURIComponent(id)}`);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Search Books</Typography>

      {/* 🔍 顶部搜索区域 */}
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item xs={12} md={10}>
          <TextField
            fullWidth
            name="keyword"
            placeholder="Search by title or author..."
            value={query.keyword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {query.keyword && (
                    <IconButton onClick={handleClear}>
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              )
            }}
            sx={{ height: '56px' }}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
            startIcon={<SearchIcon />}
            sx={{
              height: '56px',
              borderRadius: '12px',
              width: '126px'
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* 🎛️ Advanced Filter Toggle */}
      <Box sx={{ textAlign: 'left', mb: 2 }}>
        <Button
          variant="outlined"
          startIcon={<TuneIcon />}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        </Button>
      </Box>

      {/* 🔽 高级搜索区域 */}
      <Collapse in={showAdvanced}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item>
            <TextField
              size="small"
              label="Genre"
              name="genre"
              value={query.genre}
              onChange={handleChange}
              sx={{ width: '210px' }}
            />
          </Grid>
          {['min_rating', 'max_rating', 'start_year', 'end_year'].map((field) => (
            <Grid item key={field}>
              <TextField
                size="small"
                label={field.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                name={field}
                type="number"
                onChange={handleChange}
                sx={{ width: '140px' }}
              />
            </Grid>
          ))}
          <Grid item>
            <FormControl size="small" sx={{ width: '140px' }}>
              <InputLabel>Sort By</InputLabel>
              <Select name="sort_by" value={query.sort_by} label="Sort By" onChange={handleChange}>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="date">Published Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl size="small" sx={{ width: '140px' }}>
              <InputLabel>Order</InputLabel>
              <Select name="order" value={query.order} label="Order" onChange={handleChange}>
                <MenuItem value="desc">Descending</MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Collapse>

      {/* 📚 搜索结果 */}
      <Box sx={{ marginTop: 4 }}>
        {loading && <Typography>Loading...</Typography>}
        {!loading && results.length === 0 && (
          <Typography>No results found.</Typography>
        )}
        {!loading && results.length > 0 && (
          <Grid container spacing={3}>
            {results.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4} lg={2}>
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
                    <Typography variant="h6" gutterBottom>{book.title}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">by {book.author}</Typography>
                    <Typography variant="body2">⭐ {book.rating} • {book.publishedYear}</Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Tooltip title={favorites[book.id] ? 'Unfavorite' : 'Favorite'}>
                      <IconButton onClick={(e) => {
                        e.stopPropagation(); // prevent navigation
                        toggleFavorite(book.id);
                      }}>
                        {favorites[book.id] ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
