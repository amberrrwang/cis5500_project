import React from 'react';
// import Grid from '@mui/material/Grid';
import BookCard from '../components/BookCard';
import useBooks from '../helpers/useBooks';

export default function BookListPage() {
  const { books, loading } = useBooks();

  const handleAddToList = (book) => {
    console.log("Add to List clicked for:", book.title);
    // In the future: open modal, save to reading list, etc.
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Book Results</h2>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {books.map(book => (
            <BookCard key={book.id} book={book} onAdd={handleAddToList} />
          ))}
        </div>
      )}
    </div>
  );
}
