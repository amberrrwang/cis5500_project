import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

const Signup = ({ setAuthToken }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Client-side validation for matching passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://${config.server_host}:${config.server_port}/signup', { username, email, password });
      setAuthToken(res.data.token);
      setError(''); // clear any previous errors on successful signup
    } catch (err) {
      setError(err.response?.data.message || 'Signup failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleSignup} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" component="h1" align="center">
          Sign Up
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField 
          label="Username" 
          variant="outlined" 
          fullWidth 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <TextField 
          label="Email" 
          type="email" 
          variant="outlined" 
          fullWidth 
          value={email} 
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
        <TextField 
          label="Confirm Password" 
          type="password" 
          variant="outlined" 
          fullWidth 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;