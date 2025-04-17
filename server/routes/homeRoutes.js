const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Featured Books
router.get('/featured', homeController.getFeaturedBooks);

// Top Rated Books
router.get('/top-rated', homeController.getTopRatedBooks);

module.exports = router;
