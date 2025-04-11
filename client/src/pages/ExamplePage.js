import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';

export default function ExamplePage() {
  const [status, setStatus] = useState(null);
  const [serverTime, setServerTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/example/health`);
        setStatus(res.data.status);
        setServerTime(res.data.time);
      } catch (err) {
        setError('Failed to connect to database or API.');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>🔧 System Health Check</Typography>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          <Alert severity={status === 'OK' ? 'success' : 'error'}>
            Database Status: {status}
          </Alert>
          <Typography variant="body1" mt={2}>
            Server Time: {serverTime}
          </Typography>
        </>
      )}
    </Container>
  );
}
