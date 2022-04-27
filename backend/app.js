const express = require('express');
const app = express();

const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');
connectDB();

// utilizing cors to make requests across different ports locally:
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000']
}));

// middleware to parse json:
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// routes:
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/lists', require('./routes/listRoutes'));
app.use('/api/todos', require('./routes/todoRoutes'));

// error middleware:
app.use(errorHandler);


app.listen(PORT, () => console.log(`server started on port ${PORT}.`));