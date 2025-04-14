const { getBookCardData, getBookCardByTitle } = require("../db/queries/books");

// Controller for fetching all book cards
async function handleGetBookCards(req, res) {
  try {
    const books = await getBookCardData();
    res.json(books);
  } catch (err) {
    console.error("Error fetching book cards:", err);
    res.status(500).json({
      error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
    });
  }
}

// Controller for fetching a book card by title
async function handleGetBookByTitle(req, res) {
  try {
    const { title } = req.params;

    // Validate title parameter
    if (!title) {
      return res.status(400).json({ error: "Title parameter is required" });
    }

    const book = await getBookCardByTitle(title);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    console.error(`Error fetching book by title (${req.params.title}):`, err);
    res.status(500).json({
      error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
    });
  }
}

module.exports = {
  handleGetBookCards,
  handleGetBookByTitle,
};