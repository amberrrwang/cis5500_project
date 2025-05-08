// src/components/NavBar.jsx
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Button,
  IconButton,
  Avatar,
  alpha,
  styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '300px',
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

const NavLinkItem = ({ href, text, isMain }) => (
  <Typography
    variant={isMain ? 'h6' : 'body1'}
    noWrap
    sx={{
      mr: isMain ? 2.5 : 2,
      fontWeight: 600,
      color: 'white',
      textDecoration: 'none',
      '&:hover': { color: '#e3f2fd', transform: 'scale(1.05)', transition: '0.2s' },
    }}
  >
    <NavLink to={href} style={{ color: 'inherit', textDecoration: 'none' }}>
      {text}
    </NavLink>
  </Typography>
);

export default function NavBar({ token, setAuthToken }) {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Whenever token changes, fetch the user profile
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    (async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch profile in NavBar', err);
        setUser(null);
      }
    })();
  }, [token]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const defaultAvatar = 'https://via.placeholder.com/40';

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left: Logo + Search */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLinkItem href="/" text="BookVerse" isMain />
            <form onSubmit={handleSearchSubmit}>
              <Search>
                <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search books..."
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Search>
            </form>
          </Box>

          {/* Right: Links + Auth Button */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLinkItem href="/categories" text="Categories" />
            <NavLinkItem href="/rankings" text="Rankings" />
            <NavLinkItem href="/about" text="About Us" />

            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 1 }}>
                {/* Avatar Link */}
                <IconButton
                  component={NavLink}
                  to="/profile"
                  sx={{ p: 0 }}
                  aria-label="Go to profile"
                >
                  <Avatar
                    src={user.profile_pic || defaultAvatar}
                    alt={user.username}
                    sx={{ width: 40, height: 40 }}
                  />
                </IconButton>

                {/* Username Link */}
                <Typography
                  component={NavLink}
                  to="/profile"
                  variant="body1"
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {user.username}
                </Typography>
              </Box>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                component={NavLink}
                to="/login"
                sx={{
                  ml: 2,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}