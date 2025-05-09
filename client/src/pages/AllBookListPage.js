import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Typography, MenuItem, TextField, Card, CardContent, CardActionArea
} from '@mui/material';

export default function AllBookListsPage() {
  const [lists, setLists] = useState([]);
  const [userFilter, setUserFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const fetchLists = () => {
    let url = `${process.env.REACT_APP_API_URL}/booklists?sort_by=${sortBy}`;
    if (userFilter) url += `&user_id=${userFilter}`;
  
    const token = localStorage.getItem('authToken'); 
  
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setLists(res.data))
    .catch(err => console.error('❌ Failed to fetch lists:', err));
  };  

  useEffect(() => {
    fetchLists();
  }, [userFilter, sortBy]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>📚 All Book Lists</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Filter by User"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <TextField
          select
          label="Sort By"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="recent">Recent Activity</MenuItem>
          <MenuItem value="created">Created Date</MenuItem>
        </TextField>
      </Box>

      {lists.map((list) => (
        <Card key={list.list_id} sx={{ mb: 2 }}>
          <CardActionArea onClick={() => window.location.href = `/booklists/${list.list_id}`}>
            <CardContent>
              <Typography variant="h6">{list.list_name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {list.username} · Created: {new Date(list.created_date).toLocaleDateString()}
              </Typography>
              <Typography variant="caption">{list.is_public ? 'Public' : 'Private'} · {list.book_count} books</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
