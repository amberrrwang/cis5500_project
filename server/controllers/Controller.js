const booklistQueries = require('../db/queries/booklist');
const { getBookByTitle } = require('../db/queries/booklist');

// Get all books in a specific list
const getBookListDetail = async (req, res) => {
  const listId = req.params.id;

  try {
    const books = await booklistQueries.getBookListDetail(listId);
    if (!books) return res.status(404).json({ error: 'List not found' });
    res.json(books);
  } catch (err) {
    console.error('Error fetching book list detail:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add book to list
const addBookToList = async (req, res) => {
  const { title, authors, description, image } = req.body;
  const listId = req.params.id;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    await booklistQueries.addBookToList(listId, { title, authors, description, image });
    res.status(200).json({ message: 'Book added' });
  } catch (err) {
    console.error('Error adding book to list:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove book from list
const removeBookFromList = async (req, res) => {
  const { id: listId, title } = req.params;

  try {
    const result = await booklistQueries.removeBookFromList(listId, title);
    if (!result) return res.status(404).json({ error: 'Book not found in list' });
    res.status(200).json({ message: 'Book removed' });
  } catch (err) {
    console.error('Error removing book from list:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Edit list name or visibility
const editBookList = async (req, res) => {
  const listId = req.params.id;
  const { list_name, is_public } = req.body;

  try {
    const result = await booklistQueries.editBookList(listId, list_name, is_public);
    if (!result) return res.status(404).json({ error: 'List not found' });
    res.status(200).json({ message: 'List updated' });
  } catch (err) {
    console.error('Error editing book list:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete book list
const deleteBookList = async (req, res) => {
  const listId = req.params.id;

  try {
    // You can implement real DB deletion later
    res.status(200).json({ message: `Book list ${listId} deleted` });
  } catch (err) {
    console.error('Error deleting book list:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Filter book lists by user/activity/date
const getFilteredBookLists = async (req, res) => {
  try {
    const result = await booklistQueries.getFilteredBookLists(req.query);
    res.json(result);
  } catch (err) {
    console.error('Error filtering book lists:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get book by title
const fetchBookByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const decodedTitle = decodeURIComponent(title);

    const book = await getBookByTitle(decodedTitle);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    res.json(book);
  } catch (err) {
    console.error('Error fetching book by title:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new book list
const createBookList = async (req, res) => {
  const { user_id, list_name, is_public } = req.body;

  if (!user_id || !list_name) {
    return res.status(400).json({ error: 'user_id and list_name are required' });
  }

  try {
    const newList = await booklistQueries.createBookList(user_id, list_name, is_public);
    res.status(201).json(newList);
  } catch (err) {
    console.error('Error creating book list:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getBookListDetail,
  addBookToList,
  removeBookFromList,
  editBookList,
  deleteBookList,
  getFilteredBookLists,
  fetchBookByTitle,
  createBookList, 
};