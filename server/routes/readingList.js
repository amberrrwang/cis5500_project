const { pool } = require('../db/index');

// GET Reading Lists with preview book images for the logged-in user (protected)
const getReadingList = async function (req, res) {
    try {
        const userId = req.user.user_id;
        const query = `
        SELECT rl.list_id, rl.list_name, rl.description, rl.created_date, rl.is_public,
            COALESCE(json_agg(bm.image) FILTER (WHERE bm.image IS NOT NULL), '[]') as preview_images
        FROM reading_lists rl
        LEFT JOIN reading_list_books rlb ON rl.list_id = rlb.list_id
        LEFT JOIN books_metadata bm ON rlb.book_title = bm.title
        WHERE rl.user_id = $1
        GROUP BY rl.list_id, rl.list_name, rl.description, rl.created_date, rl.is_public
        ORDER BY rl.created_date DESC
      `;
        const { rows } = await pool.query(query, [userId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching reading lists:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Create a new Reading List (protected)
// Expects a JSON body with: { list_name, description, is_public }
const createReadingList = async function (req, res) {
    try {
        const userId = req.user.user_id;
        const { list_name, description, is_public } = req.body;
        if (!list_name)
            return res.status(400).json({ message: "List name is required" });

        const insertQuery = `
        INSERT INTO reading_lists (user_id, list_name, description, is_public)
        VALUES ($1, $2, $3, $4)
        RETURNING list_id, user_id, list_name, description, created_date, is_public
      `;
        const { rows } = await pool.query(insertQuery, [userId, list_name, description || '', is_public || false]);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error creating reading list:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// DELETE a Reading List (protected)
// Only allows deletion if the reading list belongs to the logged-in user
const deleteReadingList = async function (req, res) {
    try {
        const userId = req.user.user_id;
        const listId = req.params.listId;

        await pool.query('BEGIN');

        // First, delete entries in reading_list_books table associated with this reading list.
        await client.query(
            `DELETE FROM reading_list_books WHERE list_id = $1`,
            [listId]
        );

        // Then, delete the reading list itself, ensuring it belongs to the logged-in user.
        const deleteQuery = `
        DELETE FROM reading_lists
        WHERE list_id = $1 AND user_id = $2
        RETURNING list_id
      `;
        const { rows } = await pool.query(deleteQuery, [listId, userId]);
        if (rows.length === 0)
            return res.status(404).json({ message: "Reading list not found or not authorized" });
        res.json({ message: "Reading list deleted", listId: rows[0].list_id });
    } catch (error) {
        console.error('Error deleting reading list:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getReadingList,
    createReadingList,
    deleteReadingList
}
