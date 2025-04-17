const express = require('express');
const router = express.Router();
const { mockLists } = require('../db/booklists.mock'); // adjust path as needed


//
// GET /booklists/:id
//
router.get('/:id', (req, res) => {
  const list = mockLists[req.params.id];
  if (!list) return res.status(404).json({ error: 'List not found' });

  res.json({
    list_id: req.params.id,
    list_name: list.list_name,
    username: list.username,
    created_date: list.created_date,
    is_public: list.is_public,
    books: list.books
  });
});

//
// POST /booklists/:id/books
//
router.post('/:id/books', (req, res) => {
  const { title, authors = 'Unknown', description = '', image = '' } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const list = mockLists[req.params.id];
  if (!list) return res.status(404).json({ error: 'List not found' });

  list.books.push({ title, authors, description, image });
  res.status(201).json({ message: 'Book added to list' });
});

//
// DELETE /booklists/:id/books/:title
//
router.delete('/:id/books/:title', (req, res) => {
  const list = mockLists[req.params.id];
  if (!list) return res.status(404).json({ error: 'List not found' });

  const originalLength = list.books.length;
  list.books = list.books.filter(book => book.title.toLowerCase() !== req.params.title.toLowerCase());

  if (list.books.length === originalLength) {
    return res.status(404).json({ error: 'Book not found in list' });
  }

  res.json({ message: 'Book removed from list' });
});

//
// PUT /booklists/:id
//
router.put('/:id', (req, res) => {
  const { list_name, is_public } = req.body;
  const list = mockLists[req.params.id];
  if (!list) return res.status(404).json({ error: 'List not found' });

  if (list_name !== undefined) list.list_name = list_name;
  if (is_public !== undefined) list.is_public = is_public;

  res.json({ message: 'List updated' });
});

//
//
router.get('/', (req, res) => {
  const { user_id, sort_by } = req.query;

  let lists = Object.entries(mockLists).map(([id, list]) => ({
    list_id: id,
    list_name: list.list_name,
    username: list.username,
    created_date: list.created_date,
    is_public: list.is_public,
    book_count: list.books.length
  }));

  if (user_id) {
    lists = lists.filter(list => list.username === user_id);
  }

  if (sort_by === 'recent') {
    lists.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  }

  res.json(lists);
});

module.exports = router;
