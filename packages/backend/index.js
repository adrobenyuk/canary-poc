const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/login', (req, res) => {
    res.send({ id: 'user-1', name: 'John Dou', })
})

app.get('/', (req,res) => {
    res.send('Hello World!');
});

const server = app.listen(8888, () => {
    console.log('Backend in running on http://localhost:8888 ...')
});
