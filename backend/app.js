const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 5000;

// you need to use cors in order to make a request
// across different ports:
app.use(cors({
    origin: ['http://localhost:3000']
}));

// example route:
app.get('/api/message', (req, res) => {
    res.send('hello')
});

app.listen(PORT, () => console.log(`server started on port ${PORT}.`));