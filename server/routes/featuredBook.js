const { pool } = require('../db/index');

// GET /api/books/featured
// Returns a handful of random featured books.
const getFeaturedBooks = async function (req, res) {
    try {
        const { rows } = await pool.query(`
      SELECT title, image, average_rating, rating_count
      FROM books_metadata
      WHERE image IS NOT NULL
      ORDER BY RANDOM()
      LIMIT 10
    `);
        return res.json(rows);
    } catch (err) {
        console.error('Error fetching featured books:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getFeaturedBooks };