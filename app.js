require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const cors = require('cors');

const providers = require('./providers/routes');


const app = express();

// Express variables
app.set('PORT', process.env.PORT || 3000);
app.set('MONGO_URL', process.env.MONGO_URL);

// Middlewares
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/providers', providers);

// Serve API Rest Docs
app.get('/', (req, res) => res.redirect('/index.html'));

// MongoDB connection and init server
const uri = app.get('MONGO_URL');
mongoose.connect(uri)
  .then(() => {
    console.log('DB is connected');
    app.listen(app.get('PORT'), () => console.log(`API Rest on port ${app.get('PORT')}`));
  })
  .catch(err => console.error(err.message));
