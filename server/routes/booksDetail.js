const express = require('express');
const router = express.Router();
const bookController = require('../controllers/booksDetailController');

//the identifier can be either the title or the isbn
router.get('/:identifier', bookController.getBookByIdentifierAPI);
router.get('/:isbn/authors', bookController.getBookAuthors);
router.get('/:isbn/categories', bookController.getBookCategories);
router.get('/:isbn/reviews', bookController.getBookReviews);

module.exports = router;