const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const {verifyToken} = require("./controllers/tokenVerify");
require('dotenv').config();
const path = require('path');
const app = express();

//this is the middleware for the express server, 
// which will be used to parse the request body and handle CORS (security)
app.use(cors({
  origin: '*',
}));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('<h1>Hello, Express.js Server!</h1>');
});
//Here are the routes for the example service, which will be /example/health

const exampleRoutes = require('./routes/example');
app.use('/example', exampleRoutes);
const searchRoutes = require('./routes/searchRoutes');
app.use('/api/books', searchRoutes); // /api/books/search

const booksRoutes = require('./routes/books');
app.use("/books", booksRoutes);

const booksRouter = require('./routes/booksDetail');
app.use('/books', booksRouter);

// Routes
const homeRoutes = require('./routes/homeRoutes');
app.use('/api/books', homeRoutes);

// login, sign up
const userAuth = require('./routes/userAuth');
app.post('/signup', userAuth.signup);
app.post('/login', userAuth.login);

//profile
const profile = require('./routes/profile');
const {upload} = require('./controllers/upload');
app.get('/profile', verifyToken, profile.getProfile);
app.post('/profile/photo/upload', verifyToken, upload.single('profilePhoto'), profile.updatePhoto);
//reading list
const reading = require('./routes/readingList');
app.get('/reading-list', verifyToken, reading.getReadingList);
app.post('/reading-list', verifyToken, reading.createReadingList);
app.delete('/reading-list/:listId', verifyToken, reading.deleteReadingList);

//home page
const { getFeaturedBooks } = require('./routes/featuredBook');
app.get('/featured-books', getFeaturedBooks);
const { getTopBooks } = require('./routes/topBook');
app.get('/top-rated-books', getTopBooks);

const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, HOST, () => {
  console.log(` Server running at http://${HOST}:${PORT}/`);
});

module.exports = app;
