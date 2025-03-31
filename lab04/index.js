const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const stocks = require('./internal/stocks');

const app = express();
app.use(cors());

app.use(morgan('combined')); // Логи


const host = 'localhost';
const port = 8000;

app.use(express.json());

app.use('/stocks', stocks);

app.listen(port, host, () => {
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
});