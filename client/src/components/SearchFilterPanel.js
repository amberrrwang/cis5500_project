import React from 'react';
import {
  Box,
  Typography,
  Slider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Paper,
  Popover,
  Grid,
} from '@mui/material';

const SearchFilterPanel = ({
  genres,
  selectedGenres,
  onGenreChange,
  ratingRange,
  onRatingChange,
  ratingCountRange,
  onRatingCountChange,
  yearRange,
  onYearChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ width: '100%', px: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      {/* Genre Filter */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Genres</InputLabel>
        <OutlinedInput
          label="Genres"
          onClick={handleClick}
          value=""
          readOnly
          endAdornment={
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', p: 0.5 }}>
              {selectedGenres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  onDelete={() => {
                    onGenreChange({
                      target: {
                        value: selectedGenres.filter(g => g !== genre)
                      }
                    });
                  }}
                  size="small"
                />
              ))}
            </Box>
          }
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              width: 600,
              maxHeight: 500,
              p: 2,
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Select Genres
          </Typography>
          <Grid container spacing={1}>
            {genres.map((genre) => (
              <Grid item xs={6} sm={4} key={genre}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1,
                    cursor: 'pointer',
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={() => {
                    const newSelected = selectedGenres.includes(genre)
                      ? selectedGenres.filter(g => g !== genre)
                      : [...selectedGenres, genre];
                    onGenreChange({
                      target: {
                        value: newSelected
                      }
                    });
                  }}
                >
                  <Checkbox
                    checked={selectedGenres.includes(genre)}
                    size="small"
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {genre}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Popover>
      </FormControl>

      {/* Rating Range */}
      <Typography gutterBottom>Rating Range</Typography>
      <Box sx={{ mb: 2 }}>
        <Slider
          value={ratingRange}
          onChange={(_, newValue) => onRatingChange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={5}
          step={0.1}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <TextField
            size="small"
            type="number"
            value={ratingRange[0]}
            onChange={(e) => onRatingChange([Number(e.target.value), ratingRange[1]])}
            inputProps={{ min: 0, max: 5, step: 0.1 }}
            sx={{ width: 80 }}
          />
          <TextField
            size="small"
            type="number"
            value={ratingRange[1]}
            onChange={(e) => onRatingChange([ratingRange[0], Number(e.target.value)])}
            inputProps={{ min: 0, max: 5, step: 0.1 }}
            sx={{ width: 80 }}
          />
        </Box>
      </Box>

      {/* Rating Count Range */}
      <Typography gutterBottom>Rating Count</Typography>
      <Box sx={{ mb: 2 }}>
        <Slider
          value={ratingCountRange}
          onChange={(_, newValue) => onRatingCountChange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={22023}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <TextField
            size="small"
            type="number"
            value={ratingCountRange[0]}
            onChange={(e) => onRatingCountChange([Number(e.target.value), ratingCountRange[1]])}
            inputProps={{ min: 0, max: 22023 }}
            sx={{ width: 80 }}
          />
          <TextField
            size="small"
            type="number"
            value={ratingCountRange[1]}
            onChange={(e) => onRatingCountChange([ratingCountRange[0], Number(e.target.value)])}
            inputProps={{ min: 0, max: 22023 }}
            sx={{ width: 80 }}
          />
        </Box>
      </Box>

      {/* Year Range */}
      <Typography gutterBottom>Publication Year</Typography>
      <Box sx={{ mb: 3 }}>
        <Slider
          value={yearRange}
          onChange={(_, newValue) => onYearChange(newValue)}
          valueLabelDisplay="auto"
          min={1900}
          max={new Date().getFullYear()}
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <TextField
            size="small"
            type="number"
            value={yearRange[0]}
            onChange={(e) => onYearChange([Number(e.target.value), yearRange[1]])}
            inputProps={{ min: 1900, max: new Date().getFullYear() }}
            sx={{ width: 80 }}
          />
          <TextField
            size="small"
            type="number"
            value={yearRange[1]}
            onChange={(e) => onYearChange([yearRange[0], Number(e.target.value)])}
            inputProps={{ min: 1900, max: new Date().getFullYear() }}
            sx={{ width: 80 }}
          />
        </Box>
      </Box>

      {/* Sort Controls */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} label="Sort By" onChange={onSortByChange}>
          <MenuItem value="rating_count">Rating Count</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="year">Publication Year</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Order</InputLabel>
        <Select value={sortOrder} label="Order" onChange={onSortOrderChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchFilterPanel; 