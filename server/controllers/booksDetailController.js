// controllers/bookController.js
const bookService = require('../db/queries/booksDetail');

exports.getBookByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    const book = await getBookByIdentifier(identifier);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const [authors, categories, reviews] = await Promise.all([
      bookService.getAuthorsByIsbn(book.isbn),
      bookService.getCategoriesByTitle(book.title),
      bookService.getReviewsByTitle(book.title)
    ]);

    res.json({ ...book, authors, categories, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function getBookByIdentifier(identifier) {
  // Helper: simple ISBN check (10 or 13 digits, all numeric)
  const isISBN = /^\d{10}(\d{3})?$/.test(identifier);

  if (isISBN) {
    // Skip metadata, go straight to ISBN lookup
    return await bookService.getBookByISBN(identifier);
  }

  // Try fuzzy title match in books_metadata
  const matchedMeta = await bookService.getBookMetaDataByTitle(identifier);
  if (matchedMeta) {
    const isbn = await bookService.getISBNByTitle(matchedMeta.title);
    return { ...matchedMeta, isbn: isbn || null };
  }

  // Final fallback: attempt ISBN match anyway in case title match failed
  return await bookService.getBookByISBN(identifier);
}


exports.getBookAuthors = async (req, res) => {
  try {
    const authors = await bookService.getAuthorsByIsbn(req.params.isbn);
    res.json({ authors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getBookCategories = async (req, res) => {
  try {
    const book = await bookService.getBookByIdentifier(req.params.isbn);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const categories = await bookService.getCategoriesByTitle(book.title);
    res.json({ categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getBookReviews = async (req, res) => {
  try {
    const book = await bookService.getBookByIdentifier(req.params.isbn);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const reviews = await bookService.getReviewsByTitle(book.title);
    res.json({ reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
