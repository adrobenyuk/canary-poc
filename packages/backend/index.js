const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '1.0.0')));

app.get('/api/login', (req, res) => {
    res.cookie('USE-CANARY', 'enabled', { maxAge: 900000, httpOnly: true })
    res.send({ id: 'user-1', name: 'John Dou', });
});

app.use('*', (req, res) => {
    console.log('cookies: ');
    console.log(req.cookies);

    if (req.cookies['USE-CANARY'] && req.cookies['USE-CANARY'] === 'enabled') {
        return res.sendFile(path.join(__dirname, '1.0.0', 'index.html'));
    }
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(8888, () => {
    console.log('Backend in running on http://localhost:8888 ...')
});
