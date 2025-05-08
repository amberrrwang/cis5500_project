const db = require('../index');

// Get book list details
async function getBookListDetail(listId) {
  try {
    // Get list metadata
    const listResult = await db.query(`
      SELECT r.list_id, r.list_name, r.created_date, r.is_public, u.username
      FROM reading_lists r
      JOIN users u ON r.user_id = u.user_id
      WHERE r.list_id = $1
    `, [listId]);

    if (listResult.rows.length === 0) {
      return null;
    }

    // Get books in the list
    const booksResult = await db.query(`
      SELECT b.title, b.authors, b.description, b.image
      FROM reading_list_books rb
      JOIN books_metadata b ON rb.book_title = b.title
      WHERE rb.list_id = $1
    `, [listId]);

    const bookList = listResult.rows[0];
    bookList.books = booksResult.rows;

    return bookList;
  } catch (err) {
    console.error('Error fetching book list details:', err);
    throw new Error('Database query failed');
  }
}

// Add book to list
async function addBookToList(listId, title) {
  try {
    const result = await db.query(`
      INSERT INTO reading_list_books (list_id, book_title)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
      RETURNING *;
    `, [listId, title]);

    console.log('📚 Insert result:', result.rowCount);
    return result.rowCount;
  } catch (err) {
    console.error('❌ Error adding book to list:', err);
    throw err;
  }
}

// Remove book from list
async function removeBookFromList(listId, title) {
  try {
    await db.query(`
      DELETE FROM reading_list_books
      WHERE list_id = $1 AND book_title = $2
    `, [listId, title]);
  } catch (err) {
    console.error('Error removing book from list:', err);
    throw new Error('Database query failed');
  }
}

// Edit book list
async function editBookList(listId, list_name, is_public) {
  try {
    await db.query(`
      UPDATE reading_lists
      SET list_name = COALESCE($2, list_name),
          is_public = COALESCE($3, is_public)
      WHERE list_id = $1
    `, [listId, list_name, is_public]);
  } catch (err) {
    console.error('Error editing book list:', err);
    throw new Error('Database query failed');
  }
}

// Get filtered book lists
async function getFilteredBookLists({ user_id, sort_by }) {
  try {
    let baseQuery = `
      SELECT r.list_id, r.list_name, r.created_date, r.is_public, u.username,
             COUNT(rb.book_title) as book_count
      FROM reading_lists r
      LEFT JOIN reading_list_books rb ON r.list_id = rb.list_id
      JOIN users u ON r.user_id = u.user_id
    `;
    const conditions = [];
    const values = [];

    if (user_id) {
      conditions.push(`r.user_id = $${values.length + 1}`);
      values.push(user_id);
    }

    baseQuery += conditions.length ? ` WHERE ${conditions.join(' AND ')}` : '';
    baseQuery += ` GROUP BY r.list_id, u.username`;

    if (sort_by === 'recent') baseQuery += ` ORDER BY r.created_date DESC`;
    else if (sort_by === 'user') baseQuery += ` ORDER BY u.username ASC`;

    const result = await db.query(baseQuery, values);
    return result.rows;
  } catch (err) {
    console.error('Error fetching filtered book lists:', err);
    throw new Error('Database query failed');
  }
}

// Get book by title
async function getBookByTitle(title) {
  try {
    const query = `
      SELECT * FROM books_metadata
      WHERE title = $1
    `;
    const result = await db.query(query, [title]);
    return result.rows[0]; // Only one book per title
  } catch (err) {
    console.error('Error fetching book by title:', err);
    throw new Error('Database query failed');
  }
}

// Create a new book list
async function createBookList(user_id, list_name, is_public = false) {
  try {
    const result = await db.query(`
      INSERT INTO reading_lists (user_id, list_name, is_public)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [user_id, list_name, is_public]);

    return result.rows[0];
  } catch (err) {
    console.error('Error creating book list:', err);
    throw new Error('Database query failed');
  }
}

module.exports = {
  getBookListDetail,
  addBookToList,
  removeBookFromList,
  editBookList,
  getFilteredBookLists,
  getBookByTitle,
  createBookList, 
};
