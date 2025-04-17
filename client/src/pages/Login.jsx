import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Link as MuiLink } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = ({ setAuthToken }) => {
  const [email_username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email_username, password });
      localStorage.setItem('authToken', res.data.token);
      setAuthToken(res.data.token);
      // Redirect to the previous page if exists, otherwise default to homepage ('/')
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (err) {
        console.log('err: ', err);
      setError(err.response?.data.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" component="h1" align="center">
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField 
          label="Email or Username" 
          type="email_username" 
          variant="outlined" 
          fullWidth 
          value={email_username} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <TextField 
          label="Password" 
          type="password" 
          variant="outlined" 
          fullWidth 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
          Login
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <MuiLink component={Link} to="/signup" underline="hover">
            Sign Up
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;