import React, { useEffect, useState, useMemo } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemButton,
  IconButton, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  CircularProgress
} from '@mui/material';
import { FixedSizeList } from 'react-window';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const DEFAULT_IMAGE = 'https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg';

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
      console.error('Server response:', err.response?.status, err.response?.data);
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
      ? [...filteredBooks].sort((a, b) => new Date(b.added_date || 0) - new Date(a.added_date || 0))
      : filteredBooks;
  }, [filteredBooks, sortByDate]);

  const renderRow = ({ index, style }) => {
    const book = sortedBooks[index];
    return (
      <ListItem
        style={style}
        key={book.title}
        secondaryAction={
          <IconButton
            edge="end"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(book.title);
            }}
          >
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton
          component={RouterLink}
          to={`/books/${encodeURIComponent(book.title)}`}
        >
          <ListItemAvatar>
            <Avatar variant="square" src={book.image || DEFAULT_IMAGE} />
          </ListItemAvatar>
          <ListItemText primary={book.title} />
        </ListItemButton>
      </ListItem>
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
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Box sx={{ width: '100%', maxWidth: 600, p: 3, textAlign: 'center' }}>
        {/* List Name + Edit */}
        {error && <Typography color="error" gutterBottom>{error}</Typography>}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
          <Typography variant="h5" sx={{ mr: 2 }}>{bookList.list_name}</Typography>
          <Button size="small" onClick={() => {
            setEditName(bookList.list_name);
            setShowEdit(true);
          }}>Edit</Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="subtitle2">
            Created by {bookList.username} · {bookList.is_public ? 'Public' : 'Private'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created on {new Date(bookList.created_date).toLocaleDateString()}
          </Typography>
          <Button size="small" variant="outlined" onClick={toggleVisibility}>
            {bookList.is_public ? 'Make Private' : 'Make Public'}
          </Button>
          <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={() => setShowAddDialog(true)}>
            Add Book
          </Button>
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField
            label="Filter by Title"
            variant="outlined"
            fullWidth
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Box>

        {/* Sort Button */}
        <Button
          variant={sortByDate ? 'contained' : 'outlined'}
          size="small"
          onClick={() => setSortByDate(prev => !prev)}
          sx={{ mb: 2 }}
        >
          {sortByDate ? 'Sorted by Date Added' : 'Sort by Date Added'}
        </Button>

        {/* Book List */}
        {sortedBooks.length > 0 ? (
          <FixedSizeList
            height={400}
            width={600}
            itemSize={72}
            itemCount={sortedBooks.length}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        ) : (
          <Typography>No books in this list.</Typography>
        )}

        <Dialog open={showEdit} onClose={() => setShowEdit(false)}>
          <DialogTitle>Edit List Name</DialogTitle>
          <DialogContent>
            <TextField
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowEdit(false)}>Cancel</Button>
            <Button onClick={saveEdit}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)}>
          <DialogTitle>Add Book</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="dense"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
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
            <Button onClick={handleAddBook}>Add</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
