# CIS5500-Spring2025-Project-BookVerse

## Project Description

BookVerse aims to solve the problem of book discovery in the digital age. With millions of books available, readers struggle to find their next great read that matches their preferences. Our application bridges this gap by combining comprehensive book metadata from the isbndb-full-database with authentic user reviews from Amazon Books Reviews. This creates a powerful search engine that helps users discover books based on reviews and ratings of like-minded individuals. Additionally, BookVerse provides valuable insights to authors and publishers about reader preferences and market trends.
Please name files and variables in 'snakecase', e.g. 'group_project'.


## Datasets

BookVerse mainly uses three datasets:

1. **isbndb_full_database**
   - Approximately 28.1M books with basic information
   - Contains: title, authors, language, title_long, date_published, isbn, isbn13

2. **books_rating_csv** (Amazon Reviews)
   - Approximately 3M book reviews
   - Covers 212,404 different books
   - Contains: book_id, book_title, user_id, review_score, review_text, etc.

3. **books_data_csv**
   - Detailed metadata for 212,404 books
   - Contains: book_title, book_description, book_authors, book_image, book_categories, etc.

## Features

1. **Search System**: Multi-parameter search across books by title, author, genre, publication date, and rating
2. **Book Detail Pages**: Comprehensive information about each book including metadata, reviews, and ratings
3. **User Profile System**: User account management with reading lists and favorites
4. **Books Gallery Page**: Showcases world-famous books with authors and winning prizes

## Technology Stack

- **Database**: PostgreSQL on AWS RDS
- **Backend**: Node.js with Express.js
- **Frontend**: React.js with Material-UI
- **Data Processing**: Python with pandas and NumPy
- **Authentication**: JWT (JSON Web Tokens) and bcrypt for password hashing
- **Data Visualization**: Chart.js and D3.js
- **Development Tools**: Git and GitHub, ESLint and Prettier, Jest, Postman for API testing
- **Deployment**: AWS EC2 for application hosting

## Team Members

- Yuqiao Su (@YuqiaoSu)
- Scott Shang (@2025Sky)
- Yamin Zhang (@Yamy-Z)
- Amber Wang (@amberrrwang)

