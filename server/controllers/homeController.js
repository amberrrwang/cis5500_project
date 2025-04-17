const homeService = require('../db/queries/homeQueries');

exports.getFeaturedBooks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const books = await homeService.getFeaturedBooks(limit);
    res.json(books);
  } catch (err) {
    console.error('Error in getFeaturedBooks:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTopRatedBooks = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const minReviews = parseInt(req.query.min_reviews) || 5;
    const books = await homeService.getTopRatedBooks(limit, minReviews);
    res.json(books);
  } catch (err) {
    console.error('Error in getTopRatedBooks:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
