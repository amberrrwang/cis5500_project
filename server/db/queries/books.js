const db = require("../index");

// Display all cards (list views, in search page, home page, etc.)
async function getBookCardData() {
  try {
    const result = await db.query(`
      SELECT 
        b.title, 
        b.image, 
        b.average_rating, 
        b.description,
        ARRAY_AGG(a.name) AS authors
      FROM books_metadata b
      JOIN isbndb_books ib ON b.title = ib.title
      JOIN book_author ba ON ib.isbn = ba.isbn
      JOIN authors a ON ba.author_id = a.author_id
      GROUP BY b.title, b.image, b.average_rating, b.description
      LIMIT 30;
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching book card data:', error.message);
    throw new Error('Failed to fetch book card data. Please try again later.');
  }
}

// Display one book card by title (for search result click)
async function getBookCardByTitle(title) {
  if (!title) {
    throw new Error('Title is required to fetch book details.');
  }

  try {
    const result = await db.query(`
      SELECT 
        b.title, 
        b.image, 
        b.average_rating, 
        b.description,
        ARRAY_AGG(a.name) AS authors
      FROM books_metadata b
      JOIN isbndb_books ib ON b.title = ib.title
      JOIN book_author ba ON ib.isbn = ba.isbn
      JOIN authors a ON ba.author_id = a.author_id
      WHERE b.title = $1
      GROUP BY b.title, b.image, b.average_rating, b.description;
    `, [title]);

    if (result.rows.length === 0) {
      throw new Error(`No book found with title: ${title}`);
    }

    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching book by title (${title}):`, error.message);
    throw new Error('Failed to fetch book details. Please try again later.');
  }
}

module.exports = {
  getBookCardData,
  getBookCardByTitle,
};
