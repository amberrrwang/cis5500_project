const searchService = require('../db/queries/searchQueries');

exports.searchBooks = async (req, res) => {
  try {
    const books = await searchService.searchBooks(req.query);
    res.json(books);
  } catch (err) {
    console.error('Error in searchBooks:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
