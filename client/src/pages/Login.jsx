import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';

const Login = ({ setAuthToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://${config.server_host}:${config.server_port}/login', { email, password });
      setAuthToken(res.data.token);
    } catch (err) {
      setError(err.response?.data.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box 
        component="form" 
        onSubmit={handleLogin} 
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h4" component="h1" align="center">
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
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
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;