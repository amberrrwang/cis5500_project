// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Button, Avatar, Alert, Grid,
  Paper, IconButton, Divider, Card, CardContent, CardMedia,
  Tooltip, CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import ReadingListCard from '../components/ReadingListCard';

const ProfileHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(135deg, #88648F 0%, #C09BC7 100%)',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/pattern.png")',
    opacity: 0.1,
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: '4px solid white',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  }
}));

const ProfilePage = ({ token }) => {
  const [user, setUser] = useState(null);
  const [readingLists, setReadingLists] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [file, setFile] = useState(null);
  const [listError, setListError] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0);

  // Fetch the user profile and reading lists when the page loads.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err.response?.data.message || err.message);
      }
    };

    const fetchReadingLists = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/reading-list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReadingLists(response.data);
      } catch (err) {
        console.error('Error fetching reading lists:', err.response?.data.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchReadingLists();
  }, [token]);

  // File upload: handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Upload the file via the API endpoint.
  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/photo/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.user);
      setFile(null);
      setUploadError('');
    } catch (error) {
      setUploadError(error.response?.data.message || "Upload failed");
    }
  };

  // Create a new reading list (demo; in a real app, you might show a dialog to add details)
  const handleCreateReadingList = async () => {
    try {
      const newList = {
        list_name: "New Reading List",
        is_public: false,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reading-list`,
        newList,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReadingLists([response.data, ...readingLists]);
    } catch (error) {
      setListError(error.response?.data.message || "Failed to create reading list");
    }
  };

  // Delete a reading list.
  const handleDeleteReadingList = async (listId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/reading-list/${listId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReadingLists((prev) => prev.filter((list) => list.list_id !== listId));
    } catch (error) {
      setListError(error.response?.data.message || "Failed to delete reading list");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Profile Header */}
      <ProfileHeader elevation={3}>
        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <Box sx={{ position: 'relative' }}>
              <StyledAvatar
                alt={user?.username || "User"}
                src={user?.profile_pic}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="icon-button-file">
                <Tooltip title="Change Profile Photo">
                  <IconButton
                    color="primary"
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: 'white' }
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </Tooltip>
              </label>
            </Box>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              {user?.username || "Loading..."}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              {user?.email}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
              Member since {new Date(user?.join_date).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item>
            <Box sx={{ 
              display: 'flex', 
              gap: 4, 
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: 2,
              borderRadius: 2
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {readingLists.length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Reading Lists
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {readingLists.reduce((total, list) => total + (list.book_count || 0), 0)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Books
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ProfileHeader>

      {/* Upload Profile Photo Section */}
      {file && (
        <Paper sx={{ p: 2, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="subtitle1">Selected file: {file.name}</Typography>
            <Button variant="contained" onClick={handleUpload}>
              Upload Photo
            </Button>
            <Button variant="outlined" onClick={() => setFile(null)}>
              Cancel
            </Button>
          </Box>
          {uploadError && <Alert severity="error" sx={{ mt: 2 }}>{uploadError}</Alert>}
        </Paper>
      )}

      {/* Reading Lists Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 40,
                height: 3,
                backgroundColor: 'primary.main',
                borderRadius: 2,
              }
            }}
          >
            My Reading Lists
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleCreateReadingList}
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Create New List
          </Button>
        </Box>
        
        {listError && <Alert severity="error" sx={{ mb: 2 }}>{listError}</Alert>}
        
        {readingLists.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Reading Lists Yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Start by creating your first reading list!
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {readingLists.map((list) => (
              <Grid item xs={12} sm={6} md={4} key={list.list_id}>
                <ReadingListCard readingList={list} onDelete={handleDeleteReadingList} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;