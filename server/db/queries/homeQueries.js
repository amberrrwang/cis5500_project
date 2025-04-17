// Notice: MOCK VERSION for Milestone 4 demo
// Replace with real DB queries after PostgreSQL is configured
// const db = require('../index');


async function getFeaturedBooks(limit = 10) {
    return [
      {
        id: "The Great Gatsby",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/TheGreatGatsby_1925jacket.jpeg/800px-TheGreatGatsby_1925jacket.jpeg",
        rating: 4.5
      },
      {
        id: "1984",
        title: "1984",
        author: "George Orwell",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg",
        rating: 4.7
      }
    ].slice(0, limit); //limit
  }
  
  async function getTopRatedBooks(limit = 10, minReviews = 5) {
    return [
      {
        id: "Pride and Prejudice",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        coverImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/PrideAndPrejudiceTitlePage.jpg/800px-PrideAndPrejudiceTitlePage.jpg",
        rating: 4.8
      },
      {
        id: "The Hobbit",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg",
        rating: 4.9
      }
    ].slice(0, limit); //limit
  }
  
  module.exports = {
    getFeaturedBooks,
    getTopRatedBooks
  };
  
//Original version

// const db = require('../index');

// // Featured Books: select top books by rating (maybe we can later randomize this or not)
// async function getFeaturedBooks(limit = 10) {
//   const query = `
//     SELECT 
//       bm.title,
//       bm.authors AS author,
//       bm.image AS "coverImage",
//       bm.average_rating AS rating,
//       bm.title AS id
//     FROM books_metadata bm
//     WHERE bm.average_rating IS NOT NULL
//     ORDER BY RANDOM()
//     LIMIT $1;
//   `;
//   const result = await db.query(query, [limit]);
//   return result.rows;
// }

// // Top Rated Books: sorted by average_rating
// async function getTopRatedBooks(limit = 10, minReviews = 5) {
//   const query = `
//     SELECT 
//       bm.title,
//       bm.authors AS author,
//       bm.image AS "coverImage",
//       bm.average_rating AS rating,
//       bm.title AS id
//     FROM books_metadata bm
//     WHERE bm.average_rating IS NOT NULL
//       AND bm.ratings_count >= $2
//     ORDER BY bm.average_rating DESC
//     LIMIT $1;
//   `;
//   const result = await db.query(query, [limit, minReviews]);
//   return result.rows;
// }

// module.exports = {
//   getFeaturedBooks,
//   getTopRatedBooks,
// };
