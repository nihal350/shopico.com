// Import required modules
require('dotenv').config()
const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const isAuthenticated = require('./middlewares/isAuthenticated');
const isAuthenticatedAdmin = require('./middlewares/isAuthenticatedAdmin');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const connectWithDb = require('./config/database')
connectWithDb()

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Set up session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

// Use the route files
app.use(authRoutes);
app.use('/', isAuthenticated, userRoutes); 
app.use('/admin', isAuthenticatedAdmin, adminRoutes);
// app.use('/', authRoutes); 

// Start the server
// app.listen(port,'192.168.29.251', () => {
//   console.log(`Server running on http://192.168.29.251:${port}`);
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});