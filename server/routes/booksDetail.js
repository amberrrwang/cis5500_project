const express = require('express');
const router = express.Router();
const bookController = require('../controllers/booksDetailController');

router.get('/:identifier', bookController.getBookByIdentifier);
router.get('/:isbn/authors', bookController.getBookAuthors);
router.get('/:isbn/categories', bookController.getBookCategories);
router.get('/:isbn/reviews', bookController.getBookReviews);

module.exports = router;