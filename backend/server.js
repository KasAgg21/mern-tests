// server.js
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Define Routes
app.use('/api/login', require('./router/api/login.js'));
app.use('/api/employees', require('./router/api/employees'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
