import React, { useState } from 'react';
import { 
  AppBar, 
  Container, 
  Toolbar, 
  Typography, 
  InputBase, 
  Box, 
  Button,
  IconButton,
  alpha,
  styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useNavigate } from 'react-router-dom';

// Styled search input component with fixed width
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '300px', // Fixed width for search bar
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

// Nav link styling
const NavLinkItem = ({ href, text, isMain }) => {
  return (
    <Typography
      variant={isMain ? 'h6' : 'body1'}
      noWrap
      sx={{
        marginRight: isMain ? '20px' : '16px',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 600,
        letterSpacing: '.05rem',
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
          color: '#e3f2fd',
          transform: 'scale(1.05)',
          transition: 'all 0.2s ease-in-out'
        },
      }}
    >
      <NavLink
        to={href}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
    </Typography>
  );
};

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left section: Logo and Search */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLinkItem href='/' text='BookVerse' isMain />
            
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search books..."
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Search>
            </form>
          </Box>
          
          {/* Right section: Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLinkItem href='/categories' text='Categories' />
            <NavLinkItem href='/rankings' text='Rankings' />
            <NavLinkItem href='/about' text='About Us' />
            <Button 
              variant="outlined" 
              color="inherit" 
              component={NavLink} 
              to="/login"
              sx={{ 
                ml: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}