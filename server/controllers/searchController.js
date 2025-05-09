const searchService = require('../db/queries/searchQueries');

exports.searchBooks = async (req, res) => {
  try {
    // Parse and validate parameters
    const {
      searchTerm,
      searchType = 'title',
      genres,
      minRating,
      maxRating,
      startYear,
      endYear,
      sortBy = 'title',
      sortOrder = 'desc',
      limit = 20,
      offset = 0
    } = req.query;

    // Convert string parameters to appropriate types
    const params = {
      searchTerm,
      searchType,
      genres: genres ? genres.split(',') : [],
      minRating: minRating ? parseFloat(minRating) : undefined,
      maxRating: maxRating ? parseFloat(maxRating) : undefined,
      startYear: startYear ? parseInt(startYear) : undefined,
      endYear: endYear ? parseInt(endYear) : undefined,
      sortBy,
      sortOrder,
      limit: parseInt(limit),
      offset: parseInt(offset)
    };

    const result = await searchService.searchBooks(params);
    res.json(result);
  } catch (err) {
    console.error('Error in searchBooks:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await searchService.getAllCategories();
    res.json(categories);
  } catch (err) {
    console.error('Error in getCategories:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
