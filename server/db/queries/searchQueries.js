async function searchBooks(queryParams) {
    const {
      title,
      author,
      genre,
      min_rating,
      max_rating,
      start_year,
      end_year,
      sort_by,
      order = 'desc',
      limit = 10
    } = queryParams;
  
    // MOCK DATA ONLY
    let data = [
  {
    id: "To Kill a Mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/7/79/To_Kill_a_Mockingbird.JPG",
    rating: 4.8,
    publishedYear: 1960,
    genre: "Fiction"
  },
  {
    id: "Pride and Prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://upload.wikimedia.org/wikipedia/commons/8/8e/PrideAndPrejudiceTitlePage.jpg",
    rating: 4.6,
    publishedYear: 1813,
    genre: "Romance"
  },
  {
    id: "The Catcher in the Rye",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/3/32/Rye_catcher.jpg",
    rating: 4.2,
    publishedYear: 1951,
    genre: "Coming-of-Age"
  },
  {
    id: "The Da Vinci Code",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/6/6b/DaVinciCode.jpg",
    rating: 4.0,
    publishedYear: 2003,
    genre: "Thriller"
  },
  {
    id: "The Alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/c/c4/TheAlchemist.jpg",
    rating: 4.3,
    publishedYear: 1988,
    genre: "Philosophical Fiction"
  },
  {
    id: "Steve Jobs",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/e/e7/Steve_Jobs_by_Walter_Isaacson.jpg",
    rating: 4.5,
    publishedYear: 2011,
    genre: "Biography"
  },
  {
    id: "The Road",
    title: "The Road",
    author: "Cormac McCarthy",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/8/8b/The_Road.jpg",
    rating: 4.1,
    publishedYear: 2006,
    genre: "Post-Apocalyptic"
  },
  {
    id: "Educated",
    title: "Educated",
    author: "Tara Westover",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/5/5e/Educated_%28Tara_Westover%29.png",
    rating: 4.7,
    publishedYear: 2018,
    genre: "Memoir"
  },
  {
    id: "Sapiens",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/8/8d/Sapiens_A_Brief_History_of_Humankind.jpg",
    rating: 4.6,
    publishedYear: 2011,
    genre: "History"
  },
  {
    id: "Thinking, Fast and Slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/8/8d/Thinking%2C_Fast_and_Slow.jpg",
    rating: 4.4,
    publishedYear: 2011,
    genre: "Psychology"
  }
];

  
    // Simple filter rules
    if (title) {
      data = data.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (author) {
      data = data.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }
    if (genre) {
      data = data.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
    }
    if (min_rating) {
      data = data.filter(book => book.rating >= parseFloat(min_rating));
    }
    if (max_rating) {
      data = data.filter(book => book.rating <= parseFloat(max_rating));
    }
    if (start_year) {
      data = data.filter(book => book.publishedYear >= parseInt(start_year));
    }
    if (end_year) {
      data = data.filter(book => book.publishedYear <= parseInt(end_year));
    }
  
    // Sort
    if (sort_by === 'rating') {
      data.sort((a, b) => order === 'asc' ? a.rating - b.rating : b.rating - a.rating);
    } else if (sort_by === 'date') {
      data.sort((a, b) => order === 'asc' ? a.publishedYear - b.publishedYear : b.publishedYear - a.publishedYear);
    }
  
    return data.slice(0, limit);
  }
  
  module.exports = {
    searchBooks
  };
  