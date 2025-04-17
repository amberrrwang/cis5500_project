const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// GET /api/books/search
router.get('/search', searchController.searchBooks);

module.exports = router;
