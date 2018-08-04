require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const cors = require('cors');

const providers = require('./providers/routes');


const app = express();

// Express variables
app.set('port', process.env.PORT || 3000);
app.set('db user', process.env.DB_USER);
app.set('db password', process.env.DB_PASSWORD);

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
const uri = `mongodb://${app.get('db user')}:${app.get('db password')}@ds125146.mlab.com:25146/foundation-test1`;
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log('DB is connected');
    app.listen(app.get('port'), () => console.log(`API Rest on port ${app.get('port')}`));
  })
  .catch(err => console.error(err.message));
