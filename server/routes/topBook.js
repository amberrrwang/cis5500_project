const {pool} = require('../db/index');

// GET /api/books/top-rated
// Returns the top-rated books by descending average_rating, requiring significant number of reviews.
const getTopBooks = async function (req, res) {
    try {
        const { rows } = await pool.query(`
          SELECT title, image, average_rating, rating_count
          FROM books_metadata
          WHERE rating_count > 1000 
            AND image IS NOT NULL
          ORDER BY average_rating DESC
          LIMIT 10
        `);
        return res.json(rows);
      } catch (err) {
        console.error('Error fetching top-rated books:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }
}

module.exports = {getTopBooks};
