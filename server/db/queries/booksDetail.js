const db = require('../index');

async function getBookMetaDataByTitle(identifier) {
  const query = `
    SELECT *
    FROM public.books_metadata
    WHERE LOWER(title) = LOWER($1)
    LIMIT 1
  `;
  const result = await db.query(query, [identifier]);
  return result.rows[0];
}


async function getBookByTitle(title) {
  const query = `
    SELECT *
    FROM public.isbndb_books
    WHERE LOWER(title) = LOWER($1)
    LIMIT 1
  `;
  const result = await db.query(query, [title]);
  return result.rows[0];
}


async function getBookByISBN(isbn) {
  const query = `
    SELECT *
    FROM public.isbndb_books
    WHERE isbn = $1
    LIMIT 1
  `;
  const result = await db.query(query, [isbn]);
  return result.rows[0];
}

async function getISBNByTitle(title) {
  const query = `
    SELECT isbn
    FROM public.isbndb_books
    WHERE title = $1
    LIMIT 1
  `;
  const result = await db.query(query, [title]);
  return result.rows[0]?.isbn || null;
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
    WHERE title = $1
    LIMIT 250;
  `, [title]);
  return result.rows;
}

module.exports = {
  getBookMetaDataByTitle,
  getBookByTitle,
  getBookByISBN,
  getISBNByTitle,
  getAuthorsByIsbn,
  getCategoriesByTitle,
  getReviewsByTitle,
};
