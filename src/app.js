require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

app.listen(3333);

module.exports = app;
