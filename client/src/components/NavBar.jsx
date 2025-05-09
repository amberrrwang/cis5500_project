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
  '&:hover': { 
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    transition: 'background-color 0.2s ease-in-out'
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '300px',
  transition: 'all 0.2s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    width: '200px',
    marginLeft: theme.spacing(1),
  },
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
    '&::placeholder': {
      opacity: 0.8,
    },
  },
}));

const NavLinkItem = ({ href, text, isMain }) => (
  <Typography
    variant={isMain ? 'h5' : 'body1'}
    noWrap
    sx={{
      mr: isMain ? 2.5 : 2,
      fontWeight: isMain ? 700 : 500,
      color: 'white',
      textDecoration: 'none',
      position: 'relative',
      fontSize: isMain ? '1.5rem' : 'inherit',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '0%',
        height: '2px',
        bottom: -4,
        left: 0,
        backgroundColor: 'white',
        transition: 'width 0.3s ease-in-out',
      },
      '&:hover': { 
        color: '#e3f2fd',
        '&::after': {
          width: '100%',
        },
      },
    }}
  >
    <NavLink to={href} style={{ color: 'inherit', textDecoration: 'none' }}>
      {text}
    </NavLink>
  </Typography>
);

export default function NavBar({ token, setAuthToken }) {
  const [user, setUser] = useState(null);
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

  const handleSearchClick = () => {
    navigate('/search');
  };

  const defaultAvatar = 'https://via.placeholder.com/40';

  return (
    <AppBar position="sticky" sx={{ 
      backdropFilter: 'blur(8px)',
      backgroundColor: 'rgba(170, 125, 177, 0.95)',
    }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          minHeight: '70px',
        }}>
          {/* Left: Logo + Search */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLinkItem href="/" text="BookVerse" isMain />
            <IconButton
              onClick={handleSearchClick}
              sx={{
                ml: 2,
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.1)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Right: Links + Auth Button */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLinkItem href="/featured" text="Featured" />
            <NavLinkItem href="/rankings" text="Rankings" />
            <NavLinkItem href="/about" text="About Us" />

            {user ? (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                ml: 2, 
                gap: 1,
                '&:hover': {
                  '& .MuiAvatar-root': {
                    transform: 'scale(1.1)',
                  },
                },
              }}>
                <IconButton
                  component={NavLink}
                  to="/profile"
                  sx={{ p: 0 }}
                  aria-label="Go to profile"
                >
                  <Avatar
                    src={user.profile_pic || defaultAvatar}
                    alt={user.username}
                    sx={{ 
                      width: 40, 
                      height: 40,
                      transition: 'transform 0.2s ease-in-out',
                      border: '2px solid white',
                    }}
                  />
                </IconButton>

                <Typography
                  component={NavLink}
                  to="/profile"
                  variant="body1"
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    fontWeight: 500,
                    '&:hover': { 
                      textDecoration: 'underline',
                      color: '#F7B84D',
                    },
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
                  borderWidth: 2,
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 2,
                  },
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