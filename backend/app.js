const path = require('path');
const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');
connectDB();

// utilizing cors to make requests across different ports locally:
const cors = require('cors');
app.use(
  cors({
    origin: ['http://localhost:3000'],
  }),
);

// middleware to parse json:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes:
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/lists', require('./routes/listRoutes'));
app.use('/api/todos', require('./routes/todoRoutes'));

// serve frontend:
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')),
  );
}

// error middleware:
app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}.`));
