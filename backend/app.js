const express = require('express');
const app = express();

const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 5000;

// you need to use cors in order to make a request
// across different ports:
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000']
}));

// middleware to parse json:
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// example route:
app.get('/api/message', (req, res) => {
    res.send('hello');
});

app.use('/api/todos', require('./routes/todoRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}.`));