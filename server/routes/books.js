const express = require('express');
const router = express.Router();
const {
  handleGetBookCards,
  handleGetBookByTitle
} = require('../controllers/bookController');

// Route to fetch all book cards
router.get("/", handleGetBookCards); // GET /books

// Route to fetch a specific book card by title
router.get("/title/:title", handleGetBookByTitle); // GET /books/title/:title

module.exports = router;
