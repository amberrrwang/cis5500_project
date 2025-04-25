import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemButton, ListItemText, Snackbar, Alert } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import axios from 'axios';

function AddToReadingListButton({ bookId }) {
  const [open, setOpen] = useState(false);
  const [readingLists, setReadingLists] = useState([]);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem('authToken'));

  const fetchReadingLists = async () => {
    try {
      // Fetch the user's reading lists from the server
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/reading-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReadingLists(response.data);
    } catch (error) {
      console.error('Failed to fetch reading lists', error);
    }
  };

  const handleOpen = () => {
    if (isLoggedIn) {
      fetchReadingLists();
      setOpen(true);
    } else {
      setShowLoginAlert(true);
    }
  };

  const handleClose = () => setOpen(false);

  const handleAddToList = async (listId) => {
    try {
      // Add the book to the selected reading list
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/reading-list`, {
        listId,
        bookId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setSuccessSnackbar(true);
    } catch (error) {
      console.error('Failed to add book to list', error);
    }
    handleClose();
  };

  const handleAlertClose = () => setShowLoginAlert(false);
  const handleSuccessClose = () => setSuccessSnackbar(false);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        startIcon={<LibraryAddIcon />}
        sx={{
          backgroundColor: '#6a1b9a',
          '&:hover': {
            backgroundColor: '#4a148c',
          },
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        Add to Reading List
      </Button>

      {/* Dialog to select reading list */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a Reading List</DialogTitle>
        <DialogContent dividers>
          <List>
            {readingLists.map((list) => (
              <ListItem key={list.id} disablePadding>
                <ListItemButton onClick={() => handleAddToList(list.id)}>
                  <ListItemText primary={list.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for not logged in */}
      <Snackbar open={showLoginAlert} anchorOrigin={{vertical:"top", horizontal:"center" }} autoHideDuration={3000} onClose={handleAlertClose}>
        <Alert severity="warning" onClose={handleAlertClose}>
          Please log in to add books!
        </Alert>
      </Snackbar>

      {/* Snackbar for success */}
      <Snackbar open={successSnackbar} anchorOrigin={{vertical:"top", horizontal:"center" }} autoHideDuration={3000} onClose={handleSuccessClose}>
        <Alert severity="success" onClose={handleSuccessClose}>
          Successfully added to reading list!
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddToReadingListButton;
