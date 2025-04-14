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
      GROUP BY 
        b.title, 
        b.image, 
        b.average_rating, 
        b.description
      LIMIT 30;
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching book card data:', {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}


// Display one book card by title (for search result click)
async function getBookCardByTitle(title) {
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
      GROUP BY 
        b.title, 
        b.image, 
        b.average_rating, 
        b.description;
    `, [title]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching book by title (${title}):`, {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

module.exports = {
  getBookCardData,
  getBookCardByTitle,
};
