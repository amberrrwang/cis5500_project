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

---

## Search Page - GET `/api/books/search`

### Description

Search for books by various filters and sorting options. Supports partial matching of title and author, as well as filtering by genre, rating range, publication year range, and sorting by rating or date.

---

### Endpoint

`GET /api/books/search`

---

### Query Parameters

| Name         | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `title`      | string | No       | Partial match on book title |
| `author`     | string | No       | Partial match on author name |
| `genre`      | string | No       | Book genre (e.g., Fantasy, Biography) |
| `min_rating` | float  | No       | Minimum average rating |
| `max_rating` | float  | No       | Maximum average rating |
| `start_year` | int    | No       | Start of publication year range |
| `end_year`   | int    | No       | End of publication year range |
| `sort_by`    | string | No       | Sorting field: `rating` or `date` |
| `order`      | string | No       | Sorting order: `asc` or `desc` (default: `desc`) |
| `limit`      | int    | No       | Max number of results to return (default: 10) |

---

### Example Request

GET /api/books/search?title=harry&min_rating=4.5&genre=Fantasy&sort_by=rating&order=desc&limit=20


---

### Response

```json
[
  {
    "id": "Harry Potter and the Goblet of Fire",
    "title": "Harry Potter and the Goblet of Fire",
    "author": "J.K. Rowling",
    "coverImage": "https://...",
    "rating": 4.9,
    "publishedYear": 2000
  },
  {
    "id": "The Hobbit",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "coverImage": "https://...",
    "rating": 4.8,
    "publishedYear": 1937
  }
]

// All query parameters are optional; if none are provided, returns the latest published books sorted by date descending.

// Supports partial matches using ILIKE '%value%' in PostgreSQL.

