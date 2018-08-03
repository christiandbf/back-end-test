const express = require('express');

const morgan = require('morgan');

const app = express();

// variables
app.set('port', process.env.PORT || 3000);
app.set('db_user', process.env.DB_USER);
app.set('db_password', process.env.DB_PASSWORD);

// middlewares
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => res.redirect('/index.html'));

app.listen(3000, () => console.log(`API Rest on port ${app.get('port')}`));
