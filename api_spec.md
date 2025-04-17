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