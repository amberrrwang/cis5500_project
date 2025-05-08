-- Enable the pg_trgm extension for text search optimization
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create trigram indexes for text search
CREATE INDEX IF NOT EXISTS idx_books_metadata_title_trgm ON books_metadata USING gin (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_books_metadata_authors_trgm ON books_metadata USING gin (authors gin_trgm_ops);

-- Create B-tree indexes for numeric fields
CREATE INDEX IF NOT EXISTS idx_books_metadata_rating ON books_metadata (average_rating);
CREATE INDEX IF NOT EXISTS idx_books_metadata_published_year ON books_metadata (published_year);
CREATE INDEX IF NOT EXISTS idx_books_metadata_ratings_count ON books_metadata (ratings_count);

-- Create indexes for category relationships
CREATE INDEX IF NOT EXISTS idx_book_categories_title ON book_categories (book_title);
CREATE INDEX IF NOT EXISTS idx_book_categories_category_id ON book_categories (category_id);
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories (category_name);

-- Create composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_books_metadata_rating_year ON books_metadata (average_rating, published_year);
CREATE INDEX IF NOT EXISTS idx_books_metadata_year_rating ON books_metadata (published_year, average_rating); 