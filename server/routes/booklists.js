const express = require('express');
const router = express.Router();
const booklistController = require('../controllers/bookListController');

router.get('/', booklistController.getFilteredBookLists); 
router.get('/:id', booklistController.getBookListDetail);
router.post('/', booklistController.createBookList);
router.post('/:id/books', booklistController.addBookToList);
router.delete('/:id/books/:title', booklistController.removeBookFromList);
router.put('/:id', booklistController.editBookList);
router.delete('/:id', booklistController.deleteBookList);

module.exports = router;