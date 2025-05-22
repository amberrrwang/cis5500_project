# CIS5500-Spring2025-Project-BookVerse 
Check out our website at: [Here!](http://34.204.225.211:8080/)
## Project Description

BookVerse aims to solve the problem of book discovery in the digital age. With millions of books available, readers struggle to find their next great read that matches their preferences. Our application bridges this gap by combining comprehensive book metadata from the isbndb-full-database with authentic user reviews from Amazon Books Reviews. This creates a powerful search engine that helps users discover books based on reviews and ratings of like-minded individuals. Additionally, BookVerse provides valuable insights to authors and publishers about reader preferences and market trends.

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

## Directory Structure

### 🔷 client/
Frontend built with React.

```
client/
├── public/             
├── src/                  
│   ├── _tests_/          # Central location for client tests (extra credit)
│   ├── components/       # Reusable UI components (e.g., Header, Button)
│   ├── helpers/          # Utility/helper functions
│   ├── pages/            # Route-level React views (e.g., ExamplePage)
│   ├── App.js            # App layout with routing
│   └── index.js          # React entry point for rendering
├── .env                  
└── package.json         
```

### 🔷 server/
Backend built with Node.js + Express + PostgreSQL.

```
server/
├── _tests_/              # Jest tests (extra credit)
├── controllers/          # Route handler logic for API endpoints
├── db/                   
│   └── queries/          # Modular SQL query definitions
├── routes/               # API route definitions (e.g., /example)
├── .env                  # Duplicate .env.example with your credentials
└── package.json          # Backend dependencies and scripts
```
## Getting Started

### In the server folder:
```bash
cd server
npm install
```

### In the client folder:
```bash
cd ../client
npm install
```

---

## Running the App Locally

### 1. Start the backend server
```bash
cd server
npm start
```

This runs the Express server on `http://localhost:8080`.

### 2. Start the frontend (React)
```bash
cd ../client
npm start
```

This runs the React frontend on `http://localhost:3000`.

The React app will proxy API requests to the backend based on `REACT_APP_API_URL`.

---

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

## Deploy
The ./github/workflows contains the deploy yaml file that will use ssh to connect to EC2 instance of AWS. It utilizes the Github Access Token to pull from the current repository. It will build the frontend static files, and then run the server with pm2 that will restart previous deploy if exist. By doing this, we can acheive a simple CICD pipeline with limited access in AWS (since we can't create IAM roles and create access keys).

## Team Members

- Yuqiao Su (@YuqiaoSu)
- Scott Shang (@2025Sky)
- Yamin Zhang (@Yamy-Z)
- Amber Wang (@amberrrwang)

