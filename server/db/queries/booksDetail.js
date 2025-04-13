const db = require('../index');

async function getBookMetaDataByTitle(identifier) {
  const query = `SELECT title FROM public.books_metadata WHERE title ILIKE $1 LIMIT 1`;
  const result = await db.query(query,[`%${identifier}%`]);
  return result.rows[0];
}

async function getBookByTitle(title) {
  const query = `SELECT * FROM isbndb_books ib LEFT JOIN books_metadata bm ON ib.title = bm.title WHERE ib.title = $1 LIMIT 1`;
  const result = await db.query(query, [title]);
  return result.rows[0];
}

async function getBookByISBN(isbn) {
  const query =  `SELECT * FROM isbndb_books ib LEFT JOIN books_metadata bm ON ib.title = bm.title WHERE ib.isbn = $1 LIMIT 1`;
  const result = await db.query(query, [isbn]);
  return result.rows[0];
}


async function getAuthorsByIsbn(isbn) {
  const result = await db.query(`
    SELECT a.name
    FROM public.book_author ba
    JOIN public.author a ON ba.author_id = a.author_id
    WHERE ba.isbn = $1;
  `, [isbn]);
  return result.rows.map(row => row.name);
}

async function getCategoriesByTitle(title) {
  const result = await db.query(`
    SELECT c.category_name
    FROM public.book_categories bc
    JOIN public.categories c ON bc.category_id = c.category_id
    WHERE bc.title = $1;
  `, [title]);
  return result.rows.map(row => row.category_name);
}

async function getReviewsByTitle(title) {
  const result = await db.query(`
    SELECT review_id, price, review_score, review_summary,
           review_text, review_helpfulness, review_time
    FROM public.book_reviews
    WHERE title = $1;
  `, [title]);
  return result.rows;
}

module.exports = {
  getBookMetaDataByTitle,
  getBookByTitle,
  getBookByISBN,
  getAuthorsByIsbn,
  getCategoriesByTitle,
  getReviewsByTitle,
};
