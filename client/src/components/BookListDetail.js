import React, { useEffect, useState, useMemo } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemButton,
  IconButton, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  CircularProgress, Paper, Grid, Chip, Tooltip, Divider, Container
} from '@mui/material';
import { FixedSizeList } from 'react-window';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const DEFAULT_IMAGE = 'https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
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

const BookListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: 'white',
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateX(4px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  }
}));

export default function BookListDetail() {
  const { id: listId } = useParams();
  const [bookList, setBookList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editName, setEditName] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', authors: '' });
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [sortByDate, setSortByDate] = useState(false);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/booklists/${listId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setBookList(res.data);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching list:', err);
        setError('Failed to load the book list. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [listId, token]);

  const handleDelete = async (title) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/booklists/${listId}/books/${encodeURIComponent(title)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          validateStatus: (status) => status >= 200 && status < 300
        }
      );

      setBookList(prev => {
        if (!prev || !prev.books) return prev;
        return {
          ...prev,
          books: prev.books.filter(book => book.title !== title)
        };
      });

      setError(null);
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete the book. Please try again.');
    }
  };

  const handleAddBook = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/booklists/${listId}/books`, newBook, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setBookList(prev => ({
          ...prev,
          books: [...prev.books, newBook]
        }));
        setShowAddDialog(false);
        setNewBook({ title: '', authors: '' });
      })
      .catch(err => {
        console.error('Error adding book:', err);
        setError('Failed to add the book. Please try again.');
      });
  };

  const saveEdit = () => {
    axios.put(`${process.env.REACT_APP_API_URL}/booklists/${listId}`, { list_name: editName }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setBookList(prev => ({ ...prev, list_name: editName }));
        setShowEdit(false);
      })
      .catch(err => {
        console.error('Error updating list name:', err);
        setError('Failed to update the list name. Please try again.');
      });
  };

  const toggleVisibility = () => {
    const newStatus = !bookList.is_public;
    axios.put(`${process.env.REACT_APP_API_URL}/booklists/${listId}`, { is_public: newStatus }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setBookList(prev => ({ ...prev, is_public: newStatus }));
      })
      .catch(err => {
        console.error('Error toggling visibility:', err);
        setError('Failed to change visibility. Please try again.');
      });
  };

  const filteredBooks = useMemo(() => {
    if (!bookList?.books) return [];
    return filterText.trim()
      ? bookList.books.filter(b => b.title.toLowerCase().includes(filterText.toLowerCase()))
      : bookList.books;
  }, [bookList, filterText]);

  const sortedBooks = useMemo(() => {
    if (!filteredBooks) return [];
    return sortByDate
      ? [...filteredBooks].sort((a, b) => new Date(b.date_added || 0) - new Date(a.date_added || 0))
      : filteredBooks;
  }, [filteredBooks, sortByDate]);

  const renderRow = ({ index, style }) => {
    const book = sortedBooks[index];
    return (
      <BookListItem
        style={style}
        key={book.title}
        secondaryAction={
          <Tooltip title="Remove from list">
            <IconButton
              edge="end"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(book.title);
              }}
              sx={{
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'error.light',
                  color: 'white',
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        }
        disablePadding
      >
        <ListItemButton
          component={RouterLink}
          to={`/books/${encodeURIComponent(book.title)}`}
          sx={{ py: 1 }}
        >
          <ListItemAvatar>
            <Avatar 
              variant="square" 
              src={book.image || DEFAULT_IMAGE}
              sx={{ 
                width: 50, 
                height: 75,
                borderRadius: 1,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </ListItemAvatar>
          <ListItemText 
            primary={book.title}
            secondary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Added {new Date(book.date_added).toLocaleDateString()}
                </Typography>
              </Box>
            }
          />
        </ListItemButton>
      </BookListItem>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!bookList) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography>Book list not found.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Header Section */}
      <StyledPaper elevation={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {bookList.list_name}
              </Typography>
              <Tooltip title="Edit List Name">
                <IconButton 
                  onClick={() => {
                    setEditName(bookList.list_name);
                    setShowEdit(true);
                  }}
                  sx={{ color: 'white' }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Created by {bookList.username}
              </Typography>
              <Chip
                icon={bookList.is_public ? <PublicIcon /> : <LockIcon />}
                label={bookList.is_public ? 'Public' : 'Private'}
                color={bookList.is_public ? 'success' : 'default'}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Created on {new Date(bookList.created_date).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Button
                variant="outlined"
                onClick={toggleVisibility}
                startIcon={bookList.is_public ? <LockIcon /> : <PublicIcon />}
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {bookList.is_public ? 'Make Private' : 'Make Public'}
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowAddDialog(true)}
                sx={{ 
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }
                }}
              >
                Add Book
              </Button>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>

      {/* Search and Sort Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search books in this list..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant={sortByDate ? 'contained' : 'outlined'}
              startIcon={<SortIcon />}
              onClick={() => setSortByDate(prev => !prev)}
            >
              {sortByDate ? 'Sorted by Date Added' : 'Sort by Date Added'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Book List */}
      {sortedBooks.length > 0 ? (
        <Paper sx={{ p: 2 }}>
          <FixedSizeList
            height={600}
            width="100%"
            itemSize={90}
            itemCount={sortedBooks.length}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        </Paper>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Books Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {filterText ? 'Try adjusting your search' : 'Start by adding some books to your list!'}
          </Typography>
        </Paper>
      )}

      {/* Edit Dialog */}
      <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
        <DialogTitle>Edit List Name</DialogTitle>
        <DialogContent>
          <TextField
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            fullWidth
            autoFocus
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEdit(false)}>Cancel</Button>
          <Button onClick={saveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Book Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
        <DialogTitle>Add Book to List</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            autoFocus
          />
          <TextField
            label="Authors"
            fullWidth
            margin="dense"
            value={newBook.authors}
            onChange={(e) => setNewBook({ ...newBook, authors: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddBook} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
