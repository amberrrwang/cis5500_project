# API Specification for Milestone 4

Author: Scott Shang  
Feature: Home Page  
Branch: `feature/homepage`

---

## 1. GET `/api/books/featured`

- **Description**: Get a list of featured books (can be random or based on rating).
- **Method**: GET
- **Query Parameters**:
  - `limit` (optional, integer): number of books to return, default 10
- **Response**:
```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "coverImage": "https://...",
    "rating": 4.5
  }
]
```

## 2. GET `/api/books/top-rated`

- **Description**: Get top-rated books sorted by average rating.
- **Method**: GET
- **Query Parameters**:
  - `limit` (optional, integer): number of books to return, default 10
  - `min_reviews` (optional, integer): minimum number of reviews
- **Response**:
```json
[
  {
    "id": 2,
    "title": "Harry Potter",
    "author": "J.K. Rowling",
    "coverImage": "https://...",
    "rating": 4.9
  }
]
```