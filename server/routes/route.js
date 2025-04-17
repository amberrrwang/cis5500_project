const express = require('express');
const router = express.Router();
const controller = require('../controllers/Controller');

console.log('controller.createBookList =', controller.createBookList);

// Get all book lists with optional filters (e.g., by user, date, or activity)
router.get('/booklists', controller.getFilteredBookLists);

// Get details of a specific book list by ID
router.get('/booklists/:id', controller.getBookListDetail);

// Create a new book list
console.log('createBookList is:', typeof controller.createBookList);
router.post('/booklists', controller.createBookList);

// Edit an existing book list (e.g., name or visibility)
router.put('/booklists/:id', controller.editBookList);

// Delete a book list by ID
router.delete('/booklists/:id', controller.deleteBookList);

// Add/Delete Books in a List
// Add a book to a specific book list
router.post('/booklists/:id/books', controller.addBookToList);

// Remove a book from a specific book list by title
router.delete('/booklists/:id/books/:title', controller.removeBookFromList);

// Get book details by title
console.log('fetchBookByTitle is:', controller.fetchBookByTitle);
router.get('/books/:title', controller.fetchBookByTitle);

module.exports = router;