require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const morgan = require('morgan');

const app = express();

// Express variables
app.set('port', process.env.PORT || 3000);
app.set('db_user', process.env.DB_USER);
app.set('db_password', process.env.DB_PASSWORD);

// MongoDB connection
const uri = `mongodb://${app.get('db_user')}:${app.get('db_password')}@ds125146.mlab.com:25146/foundation-test1`;
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => console.log('DB is connected'))
  .catch(err => console.error(err.message));

// Middlewares
app.use(morgan('dev'));
app.use(express.static('public'));

// Serve API Rest Docs
app.get('/', (req, res) => res.redirect('/index.html'));

// Init server
app.listen(app.get('port'), () => console.log(`API Rest on port ${app.get('port')}`));
