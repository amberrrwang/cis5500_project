const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
//this is the middleware for the express server, 
// which will be used to parse the request body and handle CORS (security)
app.use(cors({
  origin: '*',
}));

app.get('/', (req, res) => {
  res.send('<h1>Hello, Express.js Server!</h1>');
});
//Here are the routes for the example service, which will be /example/health
const exampleRoutes = require('./routes/example');
app.use('/example', exampleRoutes);

const userAuth = require('./routes/user_auth');
app.post('/signup', userAuth.signup);
app.post('/login', userAuth.login);

const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running at http://${HOST}:${PORT}/`);
});

module.exports = app;
