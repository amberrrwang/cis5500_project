const { pool } = require('../db/index');

// GET /api/books/featured
// Returns a handful of random featured books that are highly rated and popular.
const getFeaturedBooks = async function (req, res) {
    try {
        const { rows } = await pool.query(`
      SELECT title, image, average_rating, rating_count
      FROM books_metadata
      WHERE image IS NOT NULL 
        AND rating_count > 5000 
        AND average_rating > 4.2
      ORDER BY RANDOM()
      LIMIT 10
    `);
        return res.json(rows);
    } catch (err) {
        console.error('Error fetching featured books:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * GET /api/books/featured
 * Returns a page of “featured” books (random order by default).
**/
const allFeaturedBooks = async function (req, res) {
    try {
        // Parse pagination params
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const offset = (page - 1) * limit;

        // 1) Get total count
        const countResult = await pool.query(`SELECT COUNT(*) AS total FROM books_metadata`);
        const total = parseInt(countResult.rows[0].total, 10);

        // 2) Fetch the page of random books
        //    Note: OFFSET + RANDOM can be slightly inefficient for large tables.
        const dataResult = await pool.query(
            `
      SELECT
        title,
        publisher,
        image,
        average_rating,
        rating_count
      FROM books_metadata
      WHERE image IS NOT NULL
      ORDER BY RANDOM()
      LIMIT $1 OFFSET $2
      `,
            [limit, offset]
        );

        return res.json({
            books: dataResult.rows,
            page,
            limit,
            total
        });
    } catch (err) {
        console.error('Error fetching paged featured books:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getFeaturedBooks, allFeaturedBooks };