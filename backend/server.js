const app = require('./app')

// get PORT from .env or use 5000 as defult PORT
const PORT = process.env.PORT || 5000;

// test server is running
// test on browser or postman

app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});