// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Button, Avatar, Alert, Grid
} from '@mui/material';
import axios from 'axios';
import ReadingListCard from '../components/ReadingListCard';

const ProfilePage = ({ token }) => {
  const [user, setUser] = useState(null);
  const [readingLists, setReadingLists] = useState([]);
  const [uploadError, setUploadError] = useState('');
  const [file, setFile] = useState(null);
  const [listError, setListError] = useState('');

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
        description: "A new reading list",
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

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* User Info Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          alt={user?.username || "User"}
          src={user?.profile_pic}
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Box>
          <Typography variant="h5">{user?.username || "Loading..."}</Typography>
          <Typography variant="body1">{user?.email}</Typography>
          <Typography variant="body2" color="text.secondary">
            Joined: {user?.join_date}
          </Typography>
        </Box>
      </Box>

      {/* Upload Profile Photo Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Update Profile Photo</Typography>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button variant="contained" onClick={handleUpload}>
            Upload Photo
          </Button>
        </Box>
        {uploadError && <Alert severity="error" sx={{ mt: 2 }}>{uploadError}</Alert>}
      </Box>

      {/* Reading Lists Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">My Reading Lists</Typography>
          <Button variant="outlined" onClick={handleCreateReadingList}>
            Create New Reading List
          </Button>
        </Box>
        {listError && <Alert severity="error" sx={{ mt: 2 }}>{listError}</Alert>}
        {readingLists.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            You have no reading lists.
          </Typography>
        ) : (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {readingLists.map((list) => (
              <Grid item xs={12} sm={6} key={list.list_id}>
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