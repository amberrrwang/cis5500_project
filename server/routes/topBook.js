const { pool } = require('../db/index');

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


/**
 * GET /api/books/rankings
 * Returns top-rated books with pagination (optional ?limit=N).
 * Books are ordered by average_rating DESC, then ratings_count DESC.
 */
const bookRanking = async function (req, res) {
  try {
    const limit = Math.max(parseInt(req.query.limit) || 50, 1);
    const { rows } = await pool.query(
      `
      SELECT
        title,
        publisher,
        image,
        average_rating,
        rating_count
      FROM books_metadata
      WHERE rating_count > 0
      ORDER BY average_rating DESC, rating_count DESC
      LIMIT $1
      `,
      [limit]
    );
    return res.json(rows);
  } catch (err) {
    console.error('Error fetching rankings:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getTopBooks, bookRanking };

